#ifndef SESSION_HPP
#define SESSION_HPP

#include "Font.hpp"
#include "Image.hpp"

class Session
{
public:
    Session(const std::string &f);
    ~Session();
    const std::string getFileName() const;
    void setFileName(const std::string &f);
   
    void setToken(int t);
    const int getToken() const;
    Image* getImage();
    Font* getFont();
private:
    std::string m_fileName;
    int m_token;
    Font* m_font;
    Image* m_image;
};

#endif // SESSION_HPP