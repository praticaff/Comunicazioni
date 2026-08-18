<!-- 🔵 TOP BAR -->
<div class="topBar">
	<div class="logo">
		<img class= "logoImmagine" src=".\immagini\logo.png">
	</div>
    <div class="title">Centrale Operativa</div>
    <div class="controls">
		<button class="userIcon" id="userIcon">
			<img src=".\immagini\utente.png">
		</button>
		<button class="settings" id="settings">
			<img src=".\immagini\impostazioni.png">
		</button>
		<div class="userMenu" id="userMenu">
			<div class="profilo" id="profilo">Profilo</div>		
			<div class="logout" id="logout">Logout</div>
		</div>
		<div class="settingsMenu" id="settingsMenu">
			<div class="valori" id="valori">Valori</div>
			<div class="tabelle" id="tabelle">Tabelle</div>
		</div>
    </div>
</div>

  <!-- 🟡 SUBMENU -->
  <div class="submenu" id="submenu">
	<div class="subIcona" id="subIcona"> <img id="subImg"></div>
	<div class="subTitolo" id="subTitolo"></div>
	<div class="subAggiungi" id="subAggiungi"><button type="button" id="subButton">Nuova pratica </button></div>
  </div>

  <!-- 🟢 MAIN -->
  <div class="main">

    <!-- 🧱 SIDEBAR -->
    <div class="sidebar">
		<div class="divElencoPratiche" id="divElencoPratiche">

		</div>
    </div>

    <!-- 📄 CONTENT -->
    <div class="divContent" id="divContent">
      <div class="content" id="content">Contenuto principale</div>
    </div>

  </div>
</div>