/**
 * Google Apps Script endpoint for Stroop test (jsPsych).
 * Publish as Web App (Execute as: Me, Who has access: Anyone).
 * Receives: { payload: [ {pid, phase, stim_word, ...}, ... ] }
 * Appends each trial as a new row into the given Google Sheet.
 */
const SHEET_NAME = "StroopDane"; // <- change to your sheet name

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const payload = body.payload || [];
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();
    const header = ["timestamp","pid","phase","stim_word","ink_color","congruency","correct_key","correct_idx","key","status","rt"];
    if(sheet.getLastRow() === 0){
      sheet.appendRow(header);
    }
    const now = new Date();
    const rows = payload.map(r => [
      now.toISOString(),
      r.pid || "",
      r.phase || "",
      r.stim_word || "",
      r.ink_color || "",
      r.congruency ?? "",
      r.correct_key || "",
      r.correct_idx ?? "",
      r.key || "",
      r.status ?? "",
      r.rt ?? ""
    ]);
    if(rows.length){
      sheet.getRange(sheet.getLastRow()+1, 1, rows.length, header.length).setValues(rows);
    }
    return ContentService.createTextOutput(JSON.stringify({ok:true, inserted: rows.length})).setMimeType(ContentService.MimeType.JSON);
  } catch(err){
    return ContentService.createTextOutput(JSON.stringify({ok:false, error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  }
}
