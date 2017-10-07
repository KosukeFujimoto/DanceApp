import numpy as num
#import sys
import os
#sys.path.append('/usr/local/lib/python2.7/site-packages')
import cv2


def video_to_frames(video, path_output_dir):
    # extract frames from a video and save to directory as 'x.png' where 
    # x is the frame index
    vidcap = cv2.VideoCapture(video)
    count = 0
    vidcap.set(cv2.CAP_PROP_FPS, 20)
    while vidcap.isOpened():
        success, image = vidcap.read()
        if success:
            cv2.imwrite(os.path.join(path_output_dir, '%d.png') % count, image)
            count += 1
        else:
            break
    cv2.destroyAllWindows()
    vidcap.release()

video_to_frames('nekomimi.mp4', './test_video')
