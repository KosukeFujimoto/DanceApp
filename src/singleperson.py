import os
import sys
import time
import re
sys.path.append(os.path.dirname(__file__) + "/../")

from scipy.misc import imread

from config import load_config
from nnet import predict
from util import visualize
from dataset.pose_dataset import data_to_input
import capture

print("Video Parser")

FileName = "20171007_015551.mp4"
PathToVideo = "../" + FileName
print(PathToVideo)
FileName = re.sub('\.mp4', '', FileName)
PathToDir = "../" + FileName
print(PathToDir)

if not os.path.exists(PathToDir):
    os.makedirs(PathToDir)

capture.video_to_frames(PathToVideo,PathToDir);


cfg = load_config("demo/pose_cfg.yaml")

# Load and setup CNN part detector
sess, inputs, outputs = predict.setup_pose_prediction(cfg)

start = time.time()
print(start)

for x in range(100) :

# Read image from file
    print(x)
    file_name = PathToDir +'/' + str(x) + ".png"
    image = imread(file_name, mode='RGB')

    image_batch = data_to_input(image)

# Compute prediction with the CNN
    outputs_np = sess.run(outputs, feed_dict={inputs: image_batch})
    scmap, locref, _ = predict.extract_cnn_output(outputs_np, cfg)

# Extract maximum scoring location from the heatmap, assume 1 person
    pose = predict.argmax_pose_predict(scmap, locref, cfg.stride)


end = time.time()
print(end)
print( start - end )

# Visualise
#visualize.show_heatmaps(cfg, image, scmap, pose)
#visualize.waitforbuttonpress()
