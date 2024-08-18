from ftplib import FTP
import os

def ConnectFTP(ip, user='Anonymous', passwd='', port=21):
    """
    Connects to an FTP server.

    Parameters:
    - ip (str): IP address of the FTP server.
    - user (str): Username for the FTP server. Default is 'Anonymous'.
    - passwd (str): Password for the FTP server. Default is an empty string.
    - port (int): Port number for the FTP server. Default is 21.

    Returns:
    - ftp (FTP): FTP connection object.
    """
    ftp_ip = ip
    ftp_port = port
    ftp_user = user
    ftp_passwd = passwd

    ftp = FTP()
    ftp.connect(ftp_ip, ftp_port)
    ftp.login(ftp_user, ftp_passwd)

    return ftp

def UploadFile(ftp, remoteFile, localFile):
    """
    Uploads a file to the FTP server.

    Parameters:
    - ftp (FTP): FTP connection object.
    - remoteFile (str): Path to the remote file on the FTP server.
    - localFile (str): Path to the local file to be uploaded.
    """
    with open(localFile, 'rb') as fp:
        ftp.storbinary('STOR ' + remoteFile, fp)

def DownLoadFile(ftp, LocalFile, RemoteFile):
    """
    Downloads a single file from the FTP server.

    Parameters:
    - ftp (FTP): FTP connection object.
    - LocalFile (str): Path to the local file where the download will be saved.
    - RemoteFile (str): Path to the remote file on the FTP server.
    """
    with open(LocalFile, 'wb') as file_handler:
        ftp.retrbinary('RETR ' + RemoteFile, file_handler.write)

def DownLoadFileTree(ftp, LocalDir, RemoteDir):
    """
    Downloads an entire directory tree from the FTP server.

    Parameters:
    - ftp (FTP): FTP connection object.
    - LocalDir (str): Path to the local directory where the download will be saved.
    - RemoteDir (str): Path to the remote directory on the FTP server.
    """
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
