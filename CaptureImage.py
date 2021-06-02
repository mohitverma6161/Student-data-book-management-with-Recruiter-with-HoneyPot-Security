import cv2
import os
import time
import matplotlib.pyplot as plt


cap = cv2.VideoCapture(0) #This will return video from the first webcam on our computer
    
if cap.isOpened():
    ret, frame = cap.read()#This code initiates an infinite loop (to be broken later by a break statement), 
    print(ret)              #where we have ret and frame being defined as the cap.read(). 
    print(frame)            #Basically, ret is a boolean regarding whether or not there was a return at all,
else:                       #at the frame is each frame that is returned.
    ret = False

img1 = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)#Here, we define a new variable, gray, as the frame, converted to RGB.

directory = r"C:/Users/mohit/Desktop/HoneyPot Security"    #Defining the path of directory
os.chdir(directory)
print(os.listdir(directory)) 
filename = 'Intruder.jpg'                   #Creating and saving the image
cv2.imwrite(filename, img1) 


cap.release()
