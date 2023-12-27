from tkinter import *
from customtkinter import *
from PIL import ImageTk, Image
from tkinter import messagebox
#import pyqrcode
import png
#from pyqrcode import QRCode

qr_path="E:\NIVH\QR_generator\gen_qr"
bg_color = "white"
text_style=("Arial",22,"bold")
img_path = "E:\NIVH\QR_generator\images\main.png"
# Function to resize the window
def create_qr():
   global qr_data
   global qr_name
   qr_data = data.get()
   qr_name = img_name.get()
   if qr_data=="":
      messagebox.showwarning("QR Code","Please enter Data for Creating Qrcode")
   elif qr_name=="":
      messagebox.showwarning("QR Code","Please enter Image Name")
   else:
      qr_img = pyqrcode.create(qr_data)
      qr_img.png(f"{qr_path}\{qr_name}.png",scale=10)
      messagebox.showinfo(f"QR Code","QR Code is Created")
"""
   new_window()
   


def new_window():
   newwindow = Toplevel(root_win)
   newwindow.title("QR")
   newwindow.geometry("400x400")

   bg = PhotoImage(file="C:\\Users\PCSS\Desktop\GSIH\QR\gen_qr\\5.png")
   print(f"{qr_path}\{qr_name}.png")
   img_label = Label(newwindow,image=bg).place(x=0,y=0,width=400,height=400)

"""

"""
def display_qr():
   qr_frame = Frame(root_win,bg="white")
   qr_frame.place(x=600,y=400,height=330,width=450)

   qr_frame_text = Label(qr_frame,
                    text="Your Generated QR",
                    font=("Arial",16,"bold"),
                    bg="white").grid(padx=120,pady=0)

   qr_code_frame = Frame(qr_frame,bg="white")
   qr_code_frame.place(x=11,y=40,height=260,width=420)

   img_show = f"{qr_path}\{qr_name}.png"
   qr_img_path = ImageTk.PhotoImage(Image.open(f"{img_show}"))
   qr_img_display = Label(qr_code_frame,image=qr_img_path).pack()

   """
root_win = Tk()

screen_height = root_win.winfo_screenheight()
screen_width = root_win.winfo_screenwidth()

root_win.geometry(f"{screen_width}x{screen_height}")
root_win.title("QR Code Generator")


bg = PhotoImage(file=img_path)
img_label = Label(root_win,image=bg).place(x=0,y=0,width=screen_width,height=screen_height)

text_data = Label(root_win,text="Home Department",font=("Arial",26,"bold"),bg="white").grid(row=0,column=0)
data_frame = CTkFrame(root_win,corner_radius=40)
data_frame.place(x=30,y=200)

text = Label(data_frame,
             text="Generate QR Code Here",
             font=text_style,bg="#d9d9d9").grid(padx=30,pady=40)

data = StringVar()
img_name = StringVar()

main_txt = Label(data_frame,
                 text="Enter Url",
                 font=text_style,bg="#d9d9d9").grid(padx=30,pady=20)

main_txt_input = CTkEntry(data_frame,
                          placeholder_text="Enter URL link",
                          width=250,
                          height=40,
                          border_width=2,
                          corner_radius=20,
                          textvariable=data,
                          placeholder_text_color=("#00bfff","#0080ff")).grid(padx=30,pady=0)

img_txt_input = CTkEntry(data_frame,
                          placeholder_text="Enter Image Name",
                          width=250,
                          height=40,
                          border_width=2,
                          corner_radius=20,
                          textvariable=img_name,
                          placeholder_text_color=("#00bfff","#0080ff")).grid(padx=30,pady=10)

submitbtn = CTkButton(data_frame,
                      text="Submit",
                      width=180,
                      height=40,
                      font=("italic",22,"bold"),
                      border_width=1,
                      command=create_qr,
                      corner_radius=20).grid(padx=30,pady=20)
"""
qr_frame = Frame(root_win,bg="white")
qr_frame.place(x=600,y=400,height=330,width=450)

qr_frame_text = Label(qr_frame,
                  text="Your Generated QR",
                  font=("Arial",16,"bold"),
                  bg="white").grid(padx=120,pady=0)

qr_code_frame = Frame(qr_frame,bg="white")
qr_code_frame.place(x=11,y=40,height=260,width=420)

qr_img_path = PhotoImage(file="C:\\Users\PCSS\Desktop\GSIH\QR\gen_qr\helllo.png")
qr_img_display = Label(qr_code_frame,image=qr_img_path).pack()
"""
root_win.mainloop()