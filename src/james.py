import os
import sys
import cv2
import numpy as np

sys.path.append(os.path.dirname(__file__) + "/../")

from scipy.misc import imread

from config import load_config
from nnet import predict
from util import visualize
from dataset.pose_dataset import data_to_input


cfg = load_config("demo/pose_cfg.yaml")

# Load and setup CNN part detector
sess, inputs, outputs = predict.setup_pose_prediction(cfg)

# Read image from file
cap = cv2.VideoCapture(0)
# file_name = "demo/image.png"
# image = imread(file_name, mode='RGB')

import time
st = time.time()
while(True):
    ret, frame = cap.read()
    small = cv2.resize(frame, (0,0), fx=0.25, fy=0.25)
    image_batch = data_to_input(small)

    # Compute prediction with the CNN
    outputs_np = sess.run(outputs, feed_dict={inputs: image_batch})
    scmap, locref, _ = predict.extract_cnn_output(outputs_np, cfg)

    # part_frame = scmap[:,:,2] + scmap[:,:,3]
    part_frame = np.sum(scmap, axis=2)
    part_frame = cv2.resize(part_frame, (0,0), fx=10, fy=10)
    # print(scmap[:,:,0])
    # scmap_part = np.sum(scmap[:, :, 0], axis=2)
    # Extract maximum scoring location from the heatmap, assume 1 person
    # pose = predict.argmax_pose_predict(scmap, locref, cfg.stride)

    # heatmap = visualize.get_heatmap(cfg, frame, scmap, pose)
    cv2.imshow("title", part_frame)
    key = cv2.waitKey(1)
    print("{:.2f}".format(time.time() - st))
    st = time.time()
    if key == ord('q'):
        break

# Visualise
# visualize.show_heatmaps(cfg, frame, scmap, pose)
# visualize.waitforbuttonpress()
