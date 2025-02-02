import json
import random

import cv2  # working with, mainly resizing, images
import numpy as np  # dealing with arrays
import os  # dealing with directories
from random import shuffle  # mixing up or currently ordered data that might lead our network astray in training.
from tqdm import tqdm  # a nice pretty percentage bar for tasks. Thanks to viewer Daniel BA1/4hler for this suggestion
from sklearn.metrics import accuracy_score

path = "./Dataset/data"
IMG_SIZE = 50
LR = 1e-3
MODEL_NAME = 'healthyvsunhealthy-{}-{}.model'.format(LR, '2conv-basic')
listdir = os.listdir(path)
shuffle(listdir)
temp = open("data.json")
temp1 = json.load((temp))

def label_img(img):
    global temp1
    word_label = temp1[img]

    if word_label == 'A':
        return [1, 0, 0, 0, 0]

    elif word_label == 'B':
        return [0, 1, 0, 0, 0]
    elif word_label == 'C':
        return [0, 0, 1, 0, 0]
    elif word_label == 'D':
        return [0, 0, 0, 1, 0]
    elif word_label == "g":
        return [0, 0, 0, 0, 1]


def create_train_data():
    global listdir,path
    i = 0
    # training_data = []
    training_x, training_y = [], []
    for img in tqdm(listdir[:-100]):
        label = label_img(img)
        temp_path = os.path.join(path, img)
        img = cv2.imread(temp_path, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
        # training_data.append([np.array(img), np.array(label)])
        training_x.append(np.array(img))
        training_y.append(np.array(label))
    # shuffle(training_data)
    # np.save('train_data.npy', training_data)
    return training_x, training_y


def process_test_data():
    global listdir,path
    testing_x = []
    testing_y = []
    for img in tqdm(listdir[-100:]):
        label = label_img(img)
        temp_path = os.path.join(path, img)
        img = cv2.imread(temp_path, cv2.IMREAD_COLOR)
        img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
        testing_x.append(np.array(img))
        testing_y.append(np.array(label))
    return testing_x,testing_y


# train_data = create_train_data()
temp_x, temp_y = create_train_data()
# If you have already created the
# dataset:
# train_data = np.load('train_data.npy')


import tflearn
from tflearn.layers.conv import conv_2d, max_pool_2d
from tflearn.layers.core import input_data, dropout, fully_connected
from tflearn.layers.estimator import regression
import tensorflow as tf

# tf.reset_default_graph()

convnet = input_data(shape=[None, IMG_SIZE, IMG_SIZE, 3], name='input')

convnet = conv_2d(convnet, 32, 3, activation='relu')
convnet = max_pool_2d(convnet, 3)

convnet = conv_2d(convnet, 64, 3, activation='relu')
convnet = max_pool_2d(convnet, 3)

convnet = conv_2d(convnet, 128, 3, activation='relu')
convnet = max_pool_2d(convnet, 3)

convnet = conv_2d(convnet, 32, 3, activation='relu')
convnet = max_pool_2d(convnet, 3)

convnet = conv_2d(convnet, 64, 3, activation='relu')
convnet = max_pool_2d(convnet, 3)

convnet = fully_connected(convnet, 1024, activation='relu')
convnet = dropout(convnet, 0.8)

convnet = fully_connected(convnet, 5, activation='softmax')
convnet = regression(convnet, optimizer='adam', learning_rate=LR, loss='categorical_crossentropy', name='targets')

model = tflearn.DNN(convnet, tensorboard_dir='log')

if os.path.exists('{}.meta'.format(MODEL_NAME)):
    model.load(MODEL_NAME)
    print('model loaded!')

else:
    # train = train_data[:-500]
    # test = train_data[-500:]

    X, Y = temp_x[:len(temp_x)-200], temp_y[:len(temp_y)-200]
    test_x, test_y = temp_x[-200:], temp_y[-200:]

    # X = np.array([i[0] for i in train]).reshape(-1, IMG_SIZE, IMG_SIZE, 3)
    # Y = [i[1] for i in train]
    #
    # test_x = np.array([i[0] for i in test]).reshape(-1, IMG_SIZE, IMG_SIZE, 3)
    # test_y = [i[1] for i in test]

    model.fit({'input': X}, {'targets': Y}, n_epoch=8, validation_set=({'input': test_x}, {'targets': test_y}),
          snapshot_step=40, show_metric=True, run_id=MODEL_NAME)

testing_x, testing_y = process_test_data()
# testing_x = np.array(testing_x).reshape(-1, IMG_SIZE, IMG_SIZE, 3)
model.save(MODEL_NAME)

test_no = random.randint(0, len(testing_x))
prediction = model.predict(testing_x)

def get_label(l):
    return ["Aanthracnose","Bacterial blight","Cercospora Fruit Spot","Fruit Rot","Healthy Fruit"][np.argmax(np.array(l))]

def get_one_hot(l):
    index = np.argmax(l)
    one_hot = [0, 0, 0, 0, 0]
    one_hot[index] = 1
    return one_hot

acc_x = [get_one_hot(i) for i in prediction]

for i in range(len(prediction)):
    print(get_label(prediction[i]), get_label(testing_y[i]))

# img = "d15.jpg"
imgs = ["g981.jpg"]
for img in imgs:
    single_predict = []
    temp_path = os.path.join("./testing", img)
    img = cv2.imread(temp_path, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
    single_predict.append(np.array(img))
    print(get_label(model.predict(single_predict)))

print(f"accuracy: {int(accuracy_score(acc_x, testing_y)*100)} %" )