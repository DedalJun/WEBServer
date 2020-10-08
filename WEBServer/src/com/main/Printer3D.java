package com.main;

import com.fazecast.jSerialComm.SerialPort;
import com.fazecast.jSerialComm.SerialPortDataListener;
import com.fazecast.jSerialComm.SerialPortEvent;

import java.io.PrintWriter;
import java.util.Scanner;

public class Printer3D {
    private static Printer3D ourinstance = new Printer3D();
    public static Printer3D getInstance(){return ourinstance;}

    String portname;
    static String input = "Connecting...";
    int baudrate;

    SerialPort port;
    Scanner inp;
    PrintWriter outp;
    boolean connectionStatus = false;

    /*
    private static final class DataListener implements SerialPortDataListener{
        @Override
        public int getListeningEvents() { return SerialPort.LISTENING_EVENT_DATA_AVAILABLE; }

        @Override
        public void serialEvent(SerialPortEvent event)
        {
            input = "";

            input = inp.nextLine();
            if (!input.equals("wait")) //------Optional filter
                System.out.println(" return: " + input);
        }
    }
    */

    public Printer3D(){
        portname = "COM1";
        baudrate = 115200;
    }

    public Printer3D(String portname, int baudrate){
        this.baudrate = baudrate;
        this.portname = portname;
    }

    static String[] showavaliableports(){
        SerialPort ports[] = SerialPort.getCommPorts();
        String names[] = new String[ports.length];
        int i=0;
        for (SerialPort portq:ports
        ) {
            names[i] = portq.getSystemPortName();
            input += "\n"+names[i];
            i++;
        }
        return names;
    }

    void initconnection(){
        //String ports[] = showavaliableports();
        //this.portname = ports[0];
        //for(String s:ports){
        //    System.out.println(s+"\n");
        //}
        port = SerialPort.getCommPort(portname);
        port.setComPortParameters(baudrate, 8, 1, 0);
        port.setComPortTimeouts(SerialPort.TIMEOUT_SCANNER, 0, 0);
        connectionStatus = port.openPort();
        //System.out.println("Open port: " + port.openPort());


        inp = new Scanner(port.getInputStream());
        outp = new PrintWriter(port.getOutputStream(), true);//-------Sending object

        //DataListener listener = new DataListener();
        //port.addDataListener(listener);

        port.addDataListener(new SerialPortDataListener() {
            @Override
            public int getListeningEvents() {
                return SerialPort.LISTENING_EVENT_DATA_AVAILABLE;
            }

            @Override
            public void serialEvent(SerialPortEvent serialPortEvent) {
                //input = "";
                if(!inp.nextLine().equals("wait"))
                   input += inp.nextLine();
                //if (input.equals("wait")) input = "null";//------Optional filter
                    //System.out.println(" return: " + input);
            }
        });
    }

    void sendcommand(String s){
        outp.println(s);
    }

    void disconnect(){
        port.closePort();
        connectionStatus = false;
        input = "Printer Disconnected";
    }

    String getInput(){
        String temp = input;
        input = "";
        //System.out.println(" return: " + input);
        return temp;
    }

    String getPortname(){
        return portname;
    }

    int getBaudrate(){
        return baudrate;
    }

    String getStatus(){
        return String.valueOf(connectionStatus);
    }

    void setPortname(String portname){
        this.portname = portname;
    }

    void setBaudrate(int baudrate){
        this.baudrate = baudrate;
    }

}
