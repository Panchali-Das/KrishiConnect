import numpy as np
from tensorflow.keras import layers, Model
from tensorflow.keras.preprocessing import image
from PIL import Image
from io import BytesIO
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import HTMLResponse

def build_model():
    inputs = layers.Input(shape=(224, 224, 3), name='input_layer_1')
    x = layers.BatchNormalization(name='batch_normalization_1')(inputs)
    x = layers.Conv2D(32, (3, 3), activation='relu', name='conv2d_1')(x)
    x = layers.MaxPooling2D((2, 2), name='max_pooling2d')(x)
    x = layers.Conv2D(64, (3, 3), activation='relu', name='conv2d_2')(x)
    x = layers.Conv2D(64, (3, 3), activation='relu', name='conv2d_3')(x)
    x = layers.MaxPooling2D((2, 2), name='max_pooling2d_1')(x)
    x = layers.Conv2D(128, (3, 3), activation='relu', name='conv2d_4')(x)
    x = layers.Conv2D(128, (3, 3), activation='relu', name='conv2d_5')(x)
    x = layers.MaxPooling2D((2, 2), name='max_pooling2d_2')(x)
    x = layers.Conv2D(256, (3, 3), activation='relu', name='conv2d_6')(x)
    x = layers.Conv2D(256, (3, 3), activation='relu', name='conv2d_7')(x)
    x = layers.MaxPooling2D((2, 2), name='max_pooling2d_3')(x)
    x = layers.Conv2D(512, (3, 3), activation='relu', name='conv2d_8')(x)
    x = layers.MaxPooling2D((2, 2), name='max_pooling2d_4')(x)
    x = layers.Flatten(name='flatten')(x)
    x = layers.Dropout(0.5, name='dropout')(x)
    x = layers.Dense(1024, activation='relu', name='dense')(x)
    x = layers.Dense(256, activation='relu', name='dense_1')(x)
    x = layers.Dense(64, activation='relu', name='dense_2')(x)
    outputs = layers.Dense(38, activation='softmax', name='dense_3')(x)
    model = Model(inputs=inputs, outputs=outputs, name='functional')
    return model

model = build_model()
model.load_weights('crop_disease_model_combined_data_augmentation.h5')

class_names = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy',
    'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_',
    'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy', 'Grape___Black_rot',
    'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',
    'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot', 'Peach___healthy',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy', 'Potato___Early_blight',
    'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy', 'Soybean___healthy',
    'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight',
    'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

def predict_image(pil_image):
    img = pil_image.resize((224, 224)).convert('RGB')
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    predictions = model.predict(img_array, verbose=0)
    predicted_class = class_names[np.argmax(predictions)]
    confidence = float(np.max(predictions)) * 100
    return {
        "prediction": predicted_class,
        "confidence": f"{confidence:.2f}%"
    }

app = FastAPI(title="Plant Disease Prediction API")

@app.get("/", response_class=HTMLResponse)
async def home():
    return """
    <html>
        <head><title>Plant Disease Prediction</title></head>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
            <h1>Plant Disease Prediction</h1>
            <form action="/predict" method="post" enctype="multipart/form-data">
                <input type="file" name="file" accept="image/*" required>
                <br><br>
                <input type="submit" value="Predict">
            </form>
        </body>
    </html>
    """

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    pil_image = Image.open(BytesIO(contents))
    result = predict_image(pil_image)
    return result
