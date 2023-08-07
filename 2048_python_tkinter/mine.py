from tkinter import *
from tkinter import messagebox
import random

class Game2048:
    def __init__(self,gamepanel):
        self.gamepanel=gamepanel
        self.end=False
        self.won=False

    def start(self):
        self.gamepanel.random_cell()
        self.gamepanel.random_cell()
        self.gamepanel.paintGrid()
        self.gamepanel.window.bind('<Key>', self.keys)
        self.gamepanel.window.mainloop()
    
    def keys(self,event):
        if self.end:
            self.gamepanel.window.destroy()
            return

        self.gamepanel.compress = False
        self.gamepanel.merge = False
        self.gamepanel.moved = False

        presed_key=event.keysym

        if presed_key=='Up':
            self.gamepanel.transpose()
            self.gamepanel.compressGrid()
            self.gamepanel.mergeGrid()
            self.gamepanel.moved = self.gamepanel.compress or self.gamepanel.merge
            self.gamepanel.compressGrid()
            self.gamepanel.transpose()

        elif presed_key=='Down':
            self.gamepanel.transpose()
            self.gamepanel.reverse()
            self.gamepanel.compressGrid()
            self.gamepanel.mergeGrid()
            self.gamepanel.moved = self.gamepanel.compress or self.gamepanel.merge
            self.gamepanel.compressGrid()
            self.gamepanel.reverse()
            self.gamepanel.transpose()

        elif presed_key=='Left':
            self.gamepanel.compressGrid()
            self.gamepanel.mergeGrid()
            self.gamepanel.moved = self.gamepanel.compress or self.gamepanel.merge
            self.gamepanel.compressGrid()

        elif presed_key=='Right':
            self.gamepanel.reverse()
            self.gamepanel.compressGrid()
            self.gamepanel.mergeGrid()
            self.gamepanel.moved = self.gamepanel.compress or self.gamepanel.merge
            self.gamepanel.compressGrid()
            self.gamepanel.reverse()
        else:
            pass

        self.gamepanel.paintGrid()
        if not(self.won):
            flag=0
            for i in range(4):
                for j in range(4):
                    if(self.gamepanel.gridCell[i][j]==2048):
                        flag=1
                        break

            if(flag==1): #found 2048
                self.won=True
                messagebox.showinfo('2048', message='You Wonnn!!\nYour score: '+str(self.gamepanel.score)+' \nContinue playing to make new highscore',)
            
            

        for i in range(4):
            for j in range(4):
                if self.gamepanel.gridCell[i][j]==0:
                    flag=1
                    break            
        if not (flag or self.gamepanel.can_merge()):
            self.end=True
            messagebox.showinfo('2048','Game Over!!!\nYour score: '+str(self.gamepanel.score))
            

        if self.gamepanel.moved:
            self.gamepanel.random_cell()
        
        self.gamepanel.paintGrid()
class Board:
    bg_color={

        '2': '#ffc0cb',
        '4': '#ede0c8',
        '8': '#edc850',
        '16': '#edc53f',
        '32': '#f67c5f',
        '64': '#f65e3b',
        '128': '#edcf72',
        '256': '#edcc61',
        '512': '#f2b179',
        '1024': '#f59563',
        '2048': '#edc22e',
        '4096': '#edcc61',
    }
    color={
         '2': '#776e65',
        '4': '#776e65',
        '8': '#f9f6f2',
        '16': '#f9f6f2',
        '32': '#f9f6f2',
        '64': '#f9f6f2',
        '128': '#f9f6f2',
        '256': '#f9f6f2',
        '512': '#776e65',
        '1024': '#f9f6f2',
        '2048': '#f9f6f2',
    }

    def __init__(self):
        
        self.window=Tk()
        
       
        self.window.title('2048 Game')
        self.gameArea=Frame(self.window,bg= 'azure3')
        self.score=0
        self.window.resizable(0,0)
        self.printscore = Label(self.window,fg="orange",font=("Lucida Grande",30,'bold'),width=10,height=1)
        self.printscore.grid(row=0,column=0)
        self.board=[]
        self.gridCell=[[0]*4 for i in range(4)]
        self.compress=False
        self.merge=False
        self.moved=False
        

        for i in range(4):
            rows=[]
            for j in range(4):
                l=Label(self.gameArea,text='',
                font=('arial',40,'bold'),width=4,height=2)
                l.grid(row=i,column=j,padx=7,pady=7)

                rows.append(l)
            self.board.append(rows)
        self.gameArea.grid()

    def reverse(self):
        for ind in range(4):
            i=0
            j=3
            while(i<j):
                self.gridCell[ind][i],self.gridCell[ind][j]=self.gridCell[ind][j],self.gridCell[ind][i]
                i+=1
                j-=1

    def transpose(self):
        temp=[[0] *4 for i in range(4)]
        for i in range(4):
                    for j in range(4):
                        temp[i][j] = self.gridCell[j][i]
        self.gridCell = temp
    def compressGrid(self):
        self.compress=False
        temp=[[0] *4 for i in range(4)]
        for i in range(4):
            cnt=0
            for j in range(4):
                if self.gridCell[i][j]!=0:
                    temp[i][cnt]=self.gridCell[i][j]
                    if cnt!=j:
                        self.compress=True
                    cnt+=1
        self.gridCell=temp

    def mergeGrid(self):
        self.merge=False
        for i in range(4):
            for j in range(4 - 1):
                if self.gridCell[i][j] == self.gridCell[i][j + 1] and self.gridCell[i][j] != 0:
                    self.gridCell[i][j] *= 2
                    self.gridCell[i][j + 1] = 0
                    self.score =self.score+self.gridCell[i][j]
                    self.merge = True

    def random_cell(self):
        cells=[]
        value=[2,4]
        for i in range(4):
            for j in range(4):
                if self.gridCell[i][j] == 0:
                    cells.append((i, j))
        curr=random.choice(cells)
        i=curr[0]
        j=curr[1]
        self.gridCell[i][j]=random.choice(value)
    
    def can_merge(self):
        for i in range(4):
            for j in range(3):
                if self.gridCell[i][j] == self.gridCell[i][j+1]:
                    return True
        
        for i in range(3):
            for j in range(4):
                if self.gridCell[i+1][j] == self.gridCell[i][j]:
                    return True
        return False

    def paintGrid(self):
        
        self.printscore.config(text="Score: "+str(self.score))
        for i in range(4):
            for j in range(4):
                if self.gridCell[i][j]==0:
                    self.board[i][j].config(text='',bg='azure4')
                else:
                    self.board[i][j].config(text=str(self.gridCell[i][j]),
                    bg=self.bg_color.get(str(self.gridCell[i][j])),
                    fg=self.color.get(str(self.gridCell[i][j])))




def StartWindow():
    img1 = PhotoImage(file="menu.png")
    img2 = PhotoImage(file="but2.png")

    l2 = Label(root,text="Summer Project 2021-22",background="#FAF8EF",foreground="green",font="times,40")
    l3 = Label(root,text="Rishabh Singh Bisht\n11902887",background="#FAF8EF",foreground="black",font="times,27")
    labelimage = Label(image = img1,background="#FAF8EF")

    but = Button(text= "click me",image=img2,background="#FAF8EF",bd=0,command=(StartPressed))

    labelimage.grid(row=0,column=0,columnspan=10,rowspan=10)
    l2.grid(row=10,column=0,columnspan=4,rowspan=1)
    l3.grid(row=11,column=0,columnspan=4,rowspan=2)
    but.grid(row=10,column=7,columnspan=3,rowspan=2)   
    root.mainloop()        
def StartPressed():
    gamepanel =Board()
    game2048 = Game2048( gamepanel)
    game2048.start()


root=Tk()
root.title("2048")
root.geometry("700x550")
root.config(background="#FAF8EF")
root.resizable(0,0)    
StartWindow()

