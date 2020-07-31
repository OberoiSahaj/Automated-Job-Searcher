from PyQt5 import QtCore, QtGui, QtWidgets
import pandas as pd
import os

class Ui_MainWindow(object):

    def load_csv(self):
        
        os.system(f'node job_data_script.js "{self.job_title.text()}"')
        df = pd.read_csv("jobs.csv")
        header = df.columns
        self.result_display.setHorizontalHeaderLabels(header)
        self.result_display.setRowCount(0)

        for i, row in df.iterrows():    
            self.result_display.insertRow(i)
            for j, col in enumerate(header):
                self.result_display.setItem(i, j, QtWidgets.QTableWidgetItem(row[col]) )

    def setupUi(self, MainWindow):
        
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(900, 700)
        MainWindow.setMinimumSize(QtCore.QSize(800, 600))
        MainWindow.setMaximumSize(QtCore.QSize(900, 700))
        
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.app_label = QtWidgets.QTextEdit(self.centralwidget)
        self.app_label.setGeometry(QtCore.QRect(280, 10, 391, 51))
        self.app_label.setToolTipDuration(-5)
        self.app_label.setAutoFillBackground(True)
        self.app_label.setStyleSheet("background-color: rgb(240, 240, 240);")
        self.app_label.setFrameShape(QtWidgets.QFrame.NoFrame)
        self.app_label.setReadOnly(True)
        self.app_label.setObjectName("app_label")
        
        self.job_label = QtWidgets.QLabel(self.centralwidget)
        self.job_label.setGeometry(QtCore.QRect(50, 89, 131, 41))
        font = QtGui.QFont()
        font.setPointSize(10)
        font.setBold(True)
        font.setWeight(75)
        self.job_label.setFont(font)
        self.job_label.setObjectName("job_label")
        self.job_title = QtWidgets.QLineEdit(self.centralwidget)
        self.job_title.setGeometry(QtCore.QRect(210, 90, 451, 31))
        font = QtGui.QFont()
        font.setFamily("MS Shell Dlg 2")
        font.setPointSize(10)
        font.setBold(False)
        font.setWeight(50)
        self.job_title.setFont(font)
        self.job_title.setText("")
        self.job_title.setObjectName("job_title")
        
        self.result_display = QtWidgets.QTableWidget(self.centralwidget)
        self.result_display.setGeometry(QtCore.QRect(50, 260, 811, 401))
        self.result_display.setRowCount(100)
        self.result_display.setColumnCount(6)
        self.result_display.setObjectName("result_display")
        
        self.jobs_btn = QtWidgets.QPushButton(self.centralwidget)
        self.jobs_btn.setGeometry(QtCore.QRect(350, 170, 221, 51))
        font = QtGui.QFont()
        font.setPointSize(10)
        font.setBold(True)
        font.setWeight(75)
        self.jobs_btn.setFont(font)
        self.jobs_btn.setObjectName("jobs_btn")
        self.jobs_btn.clicked.connect( self.load_csv )
        MainWindow.setCentralWidget(self.centralwidget)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.app_label.setHtml(_translate("MainWindow", "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0//EN\" \"http://www.w3.org/TR/REC-html40/strict.dtd\">\n"
"<html><head><meta name=\"qrichtext\" content=\"1\" /><style type=\"text/css\">\n"
"p, li { white-space: pre-wrap; }\n"
"</style></head><body style=\" font-family:\'MS Shell Dlg 2\'; font-size:7.8pt; font-weight:400; font-style:normal;\">\n"
"<p align=\"center\" style=\" margin-top:0px; margin-bottom:0px; margin-left:0px; margin-right:0px; -qt-block-indent:0; text-indent:0px;\"><span style=\" font-size:16pt; font-weight:600;\">Automated Job Searcher</span></p></body></html>"))
        self.job_label.setText(_translate("MainWindow", "Enter job title:"))
        self.jobs_btn.setText(_translate("MainWindow", "Find Jobs"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
