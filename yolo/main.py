import cv2
import numpy as np
from ultralytics import YOLO
import time

# --- AYARLAR ---
SKIP_RATE = 1
CONFIDENCE = 0.25

# --- YOĞUNLUK EŞİKLERİ ---
LIMIT_LOW = 4
LIMIT_MID = 10

# --- GÜNCEL YAYIN LİNKİ ---
SOURCE_URL = "vehicle-counting.mp4"
OUTPUT_FILENAME = "trafik_analiz_sonucu.mp4" # Kaydedilecek dosya adı

# --- RENK PALETİ (BGR) ---
COLOR_LEFT = (255, 191, 0)
COLOR_RIGHT = (0, 165, 255)
COLOR_GREEN = (0, 255, 0)
COLOR_YELLOW = (0, 255, 255)
COLOR_RED = (0, 0, 255)
COLOR_WHITE = (255, 255, 255)

# 1. MODEL VE VİDEO BAŞLATMA
print("Model yükleniyor...")
model = YOLO('yolov8n.pt')

print(f"Video kaynağı okunuyor: {SOURCE_URL}")
cap = cv2.VideoCapture(SOURCE_URL, cv2.CAP_FFMPEG)

# --- VİDEO KAYIT AYARLARI ---
# Videonun orijinal genişlik, yükseklik ve FPS değerlerini alıyoruz
frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
original_fps = cap.get(cv2.CAP_PROP_FPS)

# Eğer FPS okunamazsa varsayılan 30 yap
if original_fps == 0:
    original_fps = 30

print(f"Kayıt başlatılıyor... Çözünürlük: {frame_width}x{frame_height}, FPS: {original_fps}")

# MP4 formatında kayıt için codec tanımlaması
fourcc = cv2.VideoWriter_fourcc(*'mp4v') 
out = cv2.VideoWriter(OUTPUT_FILENAME, fourcc, original_fps, (frame_width, frame_height))

target_classes = [2, 3, 5, 7]

# Değişkenler
prev_frame_time = 0
frame_counter = 0
memory_boxes = []
memory_ids = []

# --- YARDIMCI FONKSİYONLAR ---
def draw_transparent_box(img, x, y, w, h, color, alpha=0.5):
    try:
        sub_img = img[y:y+h, x:x+w]
        white_rect = np.full(sub_img.shape, color, dtype=np.uint8)
        res = cv2.addWeighted(sub_img, 1-alpha, white_rect, alpha, 1.0)
        img[y:y+h, x:x+w] = res
    except:
        pass

def get_status_and_color(count):
    if count <= LIMIT_LOW:
        return "AKICI", COLOR_GREEN
    elif count <= LIMIT_MID:
        return "NORMAL", COLOR_YELLOW
    else:
        return "YOGUN", COLOR_RED

# --- ANA DÖNGÜ ---
while True:
    ret, frame = cap.read()

    if not ret:
        print("Video tamamlandı veya okunamadı.")
        break

    frame_counter += 1
    height, width, _ = frame.shape
    mid_x = width // 2

    # FPS Hesaplama (Sistem işlem hızı için)
    new_frame_time = time.time()
    fps = 1 / (new_frame_time - prev_frame_time) if (new_frame_time - prev_frame_time) > 0 else 0
    prev_frame_time = new_frame_time

    # --- TESPİT (ByteTrack) ---
    if frame_counter % SKIP_RATE == 0:
        results = model.track(
            frame,
            persist=True,
            tracker="bytetrack.yaml",
            verbose=False,
            classes=target_classes,
            conf=CONFIDENCE,
            imgsz=640
        )

        if results[0].boxes.id is not None:
            memory_boxes = results[0].boxes.xyxy.cpu().tolist()
            memory_ids = results[0].boxes.id.int().cpu().tolist()
        else:
            memory_boxes = []
            memory_ids = []

    # --- HESAPLAMA ---
    instant_left = 0
    instant_right = 0

    for box in memory_boxes:
        x1, y1, x2, y2 = map(int, box)
        cx = int((x1 + x2) / 2)
        if cx < mid_x:
            instant_left += 1
        else:
            instant_right += 1

    status_text_L, status_color_L = get_status_and_color(instant_left)
    status_text_R, status_color_R = get_status_and_color(instant_right)

    # --- GÖRSELLEŞTİRME ---

    # 1. Ortadaki Çizgi
    cv2.line(frame, (mid_x, 0), (mid_x, height), (200, 200, 200), 2, cv2.LINE_AA)

    # 2. Araç Kutuları
    for box, track_id in zip(memory_boxes, memory_ids):
        x1, y1, x2, y2 = map(int, box)
        cx = int((x1 + x2) / 2)
        box_color = COLOR_LEFT if cx < mid_x else COLOR_RIGHT
        cv2.rectangle(frame, (x1, y1), (x2, y2), box_color, 2, cv2.LINE_AA)
        cv2.putText(frame, f"#{track_id}", (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, box_color, 2, cv2.LINE_AA)

    # 3. Bilgi Paneli
    box_x, box_y = 0, 0
    draw_transparent_box(frame, box_x, box_y, 330, 175, (0, 0, 0), alpha=0.85)

    cv2.putText(frame, "BOLGESEL TRAFIK ANALIZI", (box_x + 15, box_y + 25), cv2.FONT_HERSHEY_DUPLEX, 0.6, COLOR_WHITE, 1, cv2.LINE_AA)
    cv2.line(frame, (box_x + 15, box_y + 35), (box_x + 315, box_y + 35), (150, 150, 150), 1, cv2.LINE_AA)

    # Sol Taraf
    line_y_1 = box_y + 65
    cv2.putText(frame, "SOL SERIT", (box_x + 15, line_y_1), cv2.FONT_HERSHEY_SIMPLEX, 0.6, COLOR_LEFT, 1, cv2.LINE_AA)
    cv2.putText(frame, f"Arac: {instant_left}", (box_x + 130, line_y_1), cv2.FONT_HERSHEY_SIMPLEX, 0.6, COLOR_WHITE, 1, cv2.LINE_AA)
    cv2.putText(frame, status_text_L, (box_x + 230, line_y_1), cv2.FONT_HERSHEY_DUPLEX, 0.7, status_color_L, 2, cv2.LINE_AA)

    # Sağ Taraf
    line_y_2 = box_y + 105
    cv2.putText(frame, "SAG SERIT", (box_x + 15, line_y_2), cv2.FONT_HERSHEY_SIMPLEX, 0.6, COLOR_RIGHT, 1, cv2.LINE_AA)
    cv2.putText(frame, f"Arac: {instant_right}", (box_x + 130, line_y_2), cv2.FONT_HERSHEY_SIMPLEX, 0.6, COLOR_WHITE, 1, cv2.LINE_AA)
    cv2.putText(frame, status_text_R, (box_x + 230, line_y_2), cv2.FONT_HERSHEY_DUPLEX, 0.7, status_color_R, 2, cv2.LINE_AA)

    # FPS Bilgisi
    line_y_3 = box_y + 135
    cv2.line(frame, (box_x + 15, line_y_3), (box_x + 315, line_y_3), (150, 150, 150), 1, cv2.LINE_AA)
    cv2.putText(frame, f"Sistem FPS: {int(fps)}", (box_x + 15, line_y_3 + 25), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1, cv2.LINE_AA)

    # --- KAYIT İŞLEMİ (EKLENDİ) ---
    # Kareyi dosyaya yaz
    out.write(frame)

    # Kullanıcıya terminalden bilgi ver (Canlı izleme olmadığı için)
    if frame_counter % 30 == 0:
        print(f"Kare işleniyor: {frame_counter} (Anlık FPS: {int(fps)})")

    # Çıkış için 'q' yerine Ctrl+C kullanabilirsiniz, ancak döngü video bitince kendiliğinden duracak.

# --- TEMİZLİK ---
print("İşlem tamamlandı. Dosya kaydedildi.")
cap.release()
out.release() # VideoWriter'ı serbest bırakmak çok önemli!
cv2.destroyAllWindows()