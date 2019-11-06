import cv2
import imutils
import numpy as np
import pytesseract
from PIL import Image

# modified from https://circuitdigest.com/microcontroller-projects/license-plate-recognition-using-raspberry-pi-and-opencv
def readlicense(filename):

    # read in image file
    img = cv2.imread(filename, cv2.IMREAD_COLOR)

    # resize for better results
    img = cv2.resize(img, (620,480) )

    # convert to grey scale
    grayscale_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # blur out unwanted details
    grayscale_img = cv2.bilateralFilter(grayscale_img, 11, 17, 17)

    # detect edges
    edges = cv2.Canny(grayscale_img, 30, 200)

    # find contours
    contours = cv2.findContours(edges.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contours = imutils.grab_contours(contours)
    contours = sorted(contours, key = cv2.contourArea, reverse = True)[:10]
    screenCnt = None

    # loop over our contours
    for c in contours:

        # approximate the contour
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.018 * peri, True)
        
        # four points means we found our rectangular plate
        if len(approx) == 4:
            screenCnt = approx
            break

    # Mask any part other than the plate
    mask = np.zeros(grayscale_img.shape, np.uint8)
    new_image = cv2.drawContours(mask,[screenCnt],0,255,-1,)
    new_image = cv2.bitwise_and(img,img,mask=mask)

    # crop image
    (x, y) = np.where(mask == 255)
    (topx, topy) = (np.min(x), np.min(y))
    (bottomx, bottomy) = (np.max(x), np.max(y))
    Cropped = grayscale_img[topx:bottomx+1, topy:bottomy+1]

    # read plate
    text = pytesseract.image_to_string(Cropped, config='--psm 11')
    
    return text