<%--
  Created by IntelliJ IDEA.
  User: Админ
  Date: 28.07.2020
  Time: 16:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>Printer Control Panel</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <script type="text/javascript" language="javascript" src="ajax.js"></script>
      <link rel="stylesheet" href="style.css">
  </head>
  <body onload="checkState()">

  <div class="blocks">
  <textarea id="textzone" disabled="disabled"></textarea>
      <br><button onclick="makeConnectRequest()" id="connect"><div id="Cbutton">Connect</div></button>
      &nbsp&nbsp <button id="terminate" onclick="makecommandRequest('terminate','M112')">Emergency stop</button>
  </div>

  <br>
  <div id="commandline" class="blocks">
      <input type="text" id="command" value="M115">&nbsp<button id="Bcomm" onclick="makecommandRequest('custom','command')" class="cbutton">Send custom command</button>
  </div>

  <br><br>
  <div id="tempset" class="blocks">
    <input type="text" id="ext" class="tmp" value="0">&nbsp<button id="extt" onclick="setTempRequest('ext')" class="cbutton">Set extruder temperature</button>
    <br><input type="text" id="bed" class="tmp" value="0">&nbsp<button id="bedt" onclick="setTempRequest('bed')" class="cbutton">Set bed temperature</button>
      <button id="showtemp" onclick="makecommandRequest('currtemp','M105')" class="cbutton">Show current temperature</button>

      <br><br><input type="text" id="mvn" class="tmp" value="100">&nbsp<button id="bmvn" onclick="makecommandRequest('mov','mvn')" class="cbutton">Set movement</button>
      <br><input type="text" id="exts" class="tmp" value="100">&nbsp<button id="bext" onclick="makecommandRequest('ext','exts')" class="cbutton">Set extrusion</button>
  </div>

  <br><br>
  <div id="moving" class="blocks">
      Step(mm):<input type="text" id="step" class="tmp" value="1">&nbsp
      <div><button id="X" onclick="moveAxis('step','X','+')" class="cbutton">Move +X to Step</button> <br><button id="XX" onclick="moveAxis('step','X','-')" class="cbutton">Move -X to Step</button> </div>&nbsp
      <div><button id="Y" onclick="moveAxis('step','Y','+')" class="cbutton">Move +Y to +Step</button> <br><button id="YY" onclick="moveAxis('step','Y','-')" class="cbutton">Move -Y to Step</button> </div>&nbsp
      <div><button id="Z" onclick="moveAxis('step','Z','+')" class="cbutton">Move +Z to +Step</button> <br><button id="ZZ" onclick="moveAxis('step','Z','-')" class="cbutton">Move -Z to Step</button> </div>
    <br><button id="HA" class="cbutton" onclick="makecommandRequest('homing','G28')">Home all axes</button>&nbsp<button id="HX" class="cbutton" onclick="makecommandRequest('homing','G28 X0')">Home X</button>&nbsp<button id="HY" class="cbutton" onclick="makecommandRequest('homing','G28 Y0')">Home Y</button>&nbsp<button id="HZ" class="cbutton" onclick="makecommandRequest('homing','G28 Z0')">Home Z</button>
  </div>

  <div id="fanset" class="blocks">
      <p><input name="Fan" id="f1" type="radio" onclick="enableFan('64')"> Set Fan on 25%</p>
      <p><input name="Fan" id="f2" type="radio" onclick="enableFan('127')"> Set Fan on 50%</p>
      <p><input name="Fan" id="f3" type="radio" onclick="enableFan('191')"> Set Fan on 75%</p>
      <p><input name="Fan" id="f4" type="radio" onclick="enableFan('255')"> Set Fan on 100%</p>
      <p><input name="Fan" id="f5" type="radio" onclick="makecommandRequest('Fan','M107');">Turn off Fan</p>
  </div>
  </body>
</html>
