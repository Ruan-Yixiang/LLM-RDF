from ftplib import FTP
import os


def ConnectFTP(ip, user='Anonymous', passwd='', port=21):
    ftp_ip = ip
    ftp_port = port
    ftp_user = user
    ftp_passwd = passwd

    ftp = FTP()
    ftp.connect(ftp_ip, ftp_port)
    ftp.login(ftp_user, ftp_passwd)

    return ftp


def UploadFile(ftp, remoteFile, localFile):
    fp = open(localFile, 'rb')
    ftp.storbinary('STOR ' + remoteFile, fp)
    fp.close()


def DownLoadFile(ftp, LocalFile, RemoteFile):  # 下载当个文件
    file_handler = open(LocalFile, 'wb')
    ftp.retrbinary('RETR ' + RemoteFile, file_handler.write)
    file_handler.close()


def DownLoadFileTree(ftp, LocalDir, RemoteDir):  # 下载整个目录下的文件
    if not os.path.exists(LocalDir):
        os.makedirs(LocalDir)
    ftp.cwd(RemoteDir)
    RemoteNames = ftp.nlst()
    for file in RemoteNames:
        Local = os.path.join(LocalDir, file)
        if file.find(".") == -1:
            if not os.path.exists(Local):
                os.makedirs(Local)
            DownLoadFileTree(ftp, Local, file)
        else:
            DownLoadFile(ftp, Local, file)
    ftp.cwd("..")


'''ftp = connectFTP()
DownLoadFileTree(ftp, 'D:\\proj1', 'dell\\proj1')
UploadFile(ftp, 'aaa.json', 'D:\\aaa.json')'''
