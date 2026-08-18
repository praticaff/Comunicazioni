export const html=`<div id="content">

      <section class="area" id="area_dati_cedente">
        <h2>Dati cedente</h2>
        <table class="form-table">
          <tr>
            <td><div class="campo"><label for="cognome">Cognome</label><input id="cognome" name="cognome" type="text" /></div></td>
            <td><div class="campo"><label for="nome">Nome</label><input id="nome" name="nome" type="text" /></div></td>
            <td><div class="campo"><label for="sesso">Sesso</label><select id="sesso" name="sesso"><option value="">--</option><option value="M">M</option><option value="F">F</option></select></div></td>
            <td><div class="campo"><label for="data_nascita">Data nascita</label><input id="data_nascita" name="data_nascita" type="date" /></div></td>
          </tr>
          <tr>
            <td><div class="campo"><label for="luogo_nascita">Luogo nascita</label><input id="luogo_nascita" name="luogo_nascita" type="text" /></div></td>
            <td><div class="campo"><label for="provincia">Provincia</label><input id="provincia" name="provincia" type="text" /></div></td>
            <td><div class="campo"><label for="codice_fiscale">Codice fiscale</label><input id="codice_fiscale" name="codice_fiscale" type="text" /></div></td>
            <td><div class="campo"><label for="residenza">Residenza</label><input id="residenza" name="residenza" type="text" /></div></td>
          </tr>
          <tr>
            <td><div class="campo"><label for="provincia_residenza">Provincia</label><input id="provincia_residenza" name="provincia_residenza" type="text" /></div></td>
            <td><div class="campo"><label for="indirizzo">Indirizzo</label><input id="indirizzo" name="indirizzo" type="text" /></div></td>
            <td><div class="campo"><label for="documento">Documento</label><select id="documento" name="documento"><option value="">Seleziona</option><option value="carta_identita_elettronica">Carta d'identità elettronica</option><option value="carta_identita">Carta d'identità</option><option value="passaporto">Passaporto</option><option value="patente">Patente</option></select></div></td>
            <td><div class="campo"><label for="numero_documento">Numero documento</label><input id="numero_documento" name="numero_documento" type="text" /></div></td>
          </tr>
          <tr>
            <td><div class="campo"><label for="telefono">Telefono</label><input id="telefono" name="telefono" type="tel" /></div></td>
            <td><div class="campo"><label for="email">Email</label><input id="email" name="email" type="email" /></div></td>
            <td colspan="2">
              <div class="checkbox-row">
                <input id="consegnata_da_delegato" name="consegnata_da_delegato" type="checkbox" />
                <label for="consegnata_da_delegato">Consegnata da delegato</label>
              </div>
            </td>
          </tr>
        </table>
      </section>

      <section class="area" id="area_cessionario">
        <h2>Cessionario</h2>
        <table class="form-table">
          <tr>
            <td><div class="campo"><label for="cognome_cessionario">Cognome</label><input id="cognome_cessionario" name="cognome_cessionario" type="text" /></div></td>
            <td><div class="campo"><label for="nome_cessionario">Nome</label><input id="nome_cessionario" name="nome_cessionario" type="text" /></div></td>
            <td><div class="campo"><label for="sesso_cessionario">Sesso</label><select id="sesso_cessionario" name="sesso_cessionario"><option value="">--</option><option value="M">M</option><option value="F">F</option></select></div></td>
            <td><div class="campo"><label for="data_nascita_cessionario">Data nascita</label><input id="data_nascita_cessionario" name="data_nascita_cessionario" type="date" /></div></td>
          </tr>
          <tr>
            <td><div class="campo"><label for="luogo_nascita_cessionario">Luogo nascita</label><input id="luogo_nascita_cessionario" name="luogo_nascita_cessionario" type="text" /></div></td>
            <td><div class="campo"><label for="nazione">Nazione</label><input id="nazione" name="nazione" type="text" /></div></td>
            <td><div class="campo"><label for="nazionalita">Nazionalità</label><input id="nazionalita" name="nazionalita" type="text" /></div></td>
            <td><div class="campo"><label for="ultimo_domicilio">Ultimo domicilio</label><input id="ultimo_domicilio" name="ultimo_domicilio" type="text" /></div></td>
          </tr>
          <tr>
            <td><div class="campo"><label for="documento_cessionario">Documento</label><select id="documento_cessionario" name="documento_cessionario"><option value="">Seleziona</option><option value="carta_identita_elettronica">Carta d'identità elettronica</option><option value="carta_identita">Carta d'identità</option><option value="passaporto">Passaporto</option><option value="patente">Patente</option></select></div></td>
            <td><div class="campo"><label for="numero_documento_cessionario">Numero documento</label><input id="numero_documento_cessionario" name="numero_documento_cessionario" type="text" /></div></td>
            <td><div class="campo"><label for="registrazione_minorenni">Registrazione minorenni</label><select id="registrazione_minorenni" name="registrazione_minorenni"><option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3" selected>3</option><option value="4">4</option><option value="5">5</option></select></div></td>
            <td></td>
          </tr>
        </table>
      </section>

      <section class="area" id="area_dati_minorenni">
        <h2>Dati minorenni</h2>
        <table class="form-table">
          <tr>
            <td><div class="campo"><label for="cognome_minorenne_1">Cognome</label><input id="cognome_minorenne_1" name="cognome_minorenne_1" type="text" /></div></td>
            <td><div class="campo"><label for="nome_minorenne_1">Nome</label><input id="nome_minorenne_1" name="nome_minorenne_1" type="text" /></div></td>
            <td><div class="campo"><label for="data_nascita_minorenne_1">Data nascita</label><input id="data_nascita_minorenne_1" name="data_nascita_minorenne_1" type="date" /></div></td>
            <td><div class="campo"><label for="luogo_nascita_minorenne_1">Luogo nascita</label><input id="luogo_nascita_minorenne_1" name="luogo_nascita_minorenne_1" type="text" /></div></td>
          </tr>
          <tr>
            <td><div class="campo"><label for="cognome_minorenne_2">Cognome</label><input id="cognome_minorenne_2" name="cognome_minorenne_2" type="text" /></div></td>
            <td><div class="campo"><label for="nome_minorenne_2">Nome</label><input id="nome_minorenne_2" name="nome_minorenne_2" type="text" /></div></td>
            <td><div class="campo"><label for="data_nascita_minorenne_2">Data nascita</label><input id="data_nascita_minorenne_2" name="data_nascita_minorenne_2" type="date" /></div></td>
            <td><div class="campo"><label for="luogo_nascita_minorenne_2">Luogo nascita</label><input id="luogo_nascita_minorenne_2" name="luogo_nascita_minorenne_2" type="text" /></div></td>
          </tr>
          <tr>
            <td><div class="campo"><label for="cognome_minorenne_3">Cognome</label><input id="cognome_minorenne_3" name="cognome_minorenne_3" type="text" /></div></td>
            <td><div class="campo"><label for="nome_minorenne_3">Nome</label><input id="nome_minorenne_3" name="nome_minorenne_3" type="text" /></div></td>
            <td><div class="campo"><label for="data_nascita_minorenne_3">Data nascita</label><input id="data_nascita_minorenne_3" name="data_nascita_minorenne_3" type="date" /></div></td>
            <td><div class="campo"><label for="luogo_nascita_minorenne_3">Luogo nascita</label><input id="luogo_nascita_minorenne_3" name="luogo_nascita_minorenne_3" type="text" /></div></td>
          </tr>
        </table>
      </section>

      <section class="area" id="area_dati_immobile">
        <h2>Dati immobile</h2>
        <table class="form-table">
          <tr>
            <td><div class="campo"><label for="titolarita_immobile">Titolarità immobile</label><select id="titolarita_immobile" name="titolarita_immobile"><option value="">Seleziona</option><option value="proprietario_immobile" selected>Proprietario dell'immobile</option><option value="locatario">Locatario</option><option value="comodatario">Comodatario</option></select></div></td>
            <td><div class="campo"><label for="indirizzo_immobile">Indirizzo</label><input id="indirizzo_immobile" name="indirizzo_immobile" type="text" /></div></td>
            <td><div class="campo"><label for="piano">Piano</label><input id="piano" name="piano" type="text" /></div></td>
            <td><div class="campo"><label for="scale">Scale</label><input id="scale" name="scale" type="text" /></div></td>
            <td><div class="campo"><label for="vani">Vani</label><input id="vani" name="vani" type="text" /></div></td>
            <td><div class="campo"><label for="ingressi">Ingressi</label><input id="ingressi" name="ingressi" type="text" /></div></td>
          </tr>
        </table>
      </section>

      <section class="area" id="area_dati_pratica">
        <h2>Dati pratica</h2>
        <table class="form-table">
          <tr>
            <td><div class="campo"><label for="motivo_cessione">Motivo cessione</label><select id="motivo_cessione" name="motivo_cessione"><option value="ospitalita" selected>OSPITALITÀ</option><option value="locazione">LOCAZIONE</option><option value="comodato">COMODATO</option><option value="altro">ALTRO</option></select></div></td>
            <td><div class="campo"><label for="data_decorrenza">Data decorrenza</label><input id="data_decorrenza" name="data_decorrenza" type="date" /></div></td>
            <td><div class="campo"><label for="data_termine">Data termine</label><input id="data_termine" name="data_termine" type="date" /></div></td>
            <td><div class="campo"><label for="data_pratica">Data pratica</label><input id="data_pratica" name="data_pratica" type="date" /></div></td>
          </tr>
        </table>
      </section>

      <div class="actions">
        <button id="salva_btn" type="button">Salva</button>
        <button id="annulla_btn" type="reset">Annulla</button>
      </div>

      <pre id="output_json" hidden></pre>
    </div>`.trim();	