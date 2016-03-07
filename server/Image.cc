#include "Image.h"
#include "Binarization.hpp"

#include <deque>

Image::Image(std::string path)
{
   img = cv::imread(path, CV_LOAD_IMAGE_COLOR);
}

void Image::setImg(cv::Mat P)
{
   img = P;
}

cv::Mat Image::getImg()
{
	return img;
}

void Image::setListCC(std::vector<ConnectedComponent> L)
{
  ListCC = L;
}

std::vector<ConnectedComponent> Image::getListCC()
{
	return ListCC;
}

void Image::BinarizedImage()
{
  NiblackSauvolaWolfJolion (img, img, WOLFJOLION);
  // Create a window

}

void Image::ImgMask()
{
 cv::blur(img,mask,cv::Size(105,5));

 cv::threshold(mask, mask,170,255,1);

 cv::medianBlur(mask, mask,9);

 cv::namedWindow("foobar");
 
// Display image in window
cv::imshow("foobar", mask);
 
// Wait for user to press a key in window
cv::waitKey(0);
}

void Image::extractConnectedComponent(cv::Mat &input,const cv::Point &seed,ConnectedComponent &cc)
{
  //assert(input.type() == CV_8U);
  assert(seed.x < input.cols && seed.y < input.rows && seed.x >= 0 && seed.y >= 0);
  std::vector<cv::Point> ListTmp;
  ListTmp = cc.getListP();
  ListTmp.clear();
  cc.setListP(ListTmp);

  std::deque<cv::Point> ptsQueue;
  uchar &pixS = input.at<unsigned char>(seed.y, seed.x);
  if (pixS != BACKGROUND) {
    ptsQueue.push_back(seed);
    pixS = BACKGROUND;
  }    

  while (! ptsQueue.empty()) {

    cv::Point current = ptsQueue.front();
    ptsQueue.pop_front();

    ListTmp = cc.getListP();
    ListTmp.push_back(current);
    cc.setListP(ListTmp);

    // enque neighboors
    const cv::Point e(current.x + 1, current.y);
    const cv::Point w(current.x - 1, current.y);
    const cv::Point n(current.x, current.y - 1);
    const cv::Point s(current.x, current.y + 1);
    if (n.y >= 0) {
      uchar &pix = input.at<unsigned char>(n.y, n.x);
      if (pix != BACKGROUND) {
        ptsQueue.push_back(n);
    pix = BACKGROUND;
      }
    }
    if (e.x < input.cols) {
      uchar &pix = input.at<unsigned char>(e.y, e.x);
      if (pix != BACKGROUND) {
        ptsQueue.push_back(e);
        pix = BACKGROUND;
      }
    }
    if (s.y < input.rows) {
      uchar &pix = input.at<unsigned char>(s.y, s.x);
      if (pix != BACKGROUND) {
        ptsQueue.push_back(s);
        pix = BACKGROUND;
      }
    }
    if (w.x >= 0) {
      uchar &pix = input.at<unsigned char>(w.y, w.x);
      if (pix != BACKGROUND) {
        ptsQueue.push_back(w);
        pix = BACKGROUND;
      }
    }
  }
  
}

void Image::extractAllConnectedComponents()
{
  //assert(Img.type() == CV_8U);

  ListCC.clear();
  ListCC.reserve(img.rows); //arbitrary

  cv::Mat tmp = img.clone();

  ConnectedComponent cc;

  for (int i = 0; i < img.rows; ++i) {
    const uchar *r = tmp.ptr<uchar>(i);
    for (int j = 0; j < img.cols; ++j) {
      if (r[j] != BACKGROUND) {
        std::vector<cv::Point> ListTmp;
        ListTmp = cc.getListP();
        ListTmp.clear();
        cc.setListP(ListTmp);
        extractConnectedComponent(tmp, cv::Point(j, i), cc); //modify tmp
        ListCC.push_back(cc);
      }
    }
  }

}

