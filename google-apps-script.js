function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.tryLock(10000);
    try {
        const doc = SpreadsheetApp.getActiveSpreadsheet();
        const sheet = doc.getSheetByName('Sheet1'); // Make sure your sheet name matches
        // Parse the JSON data sent from the website
        const data = JSON.parse(e.postData.contents);
        // Handle Photo Upload (Save to Drive)
        let photoUrl = "No Photo";
        if (data.photoData && data.photoName) {
            try {
                const folderName = "CEIS_Registrations_Photos";
                let folder;
                const folders = DriveApp.getFoldersByName(folderName);
                if (folders.hasNext()) {
                    folder = folders.next();
                } else {
                    folder = DriveApp.createFolder(folderName);
                }

                const blob = Utilities.newBlob(Utilities.base64Decode(data.photoData), data.photoType, data.photoName);
                const file = folder.createFile(blob);
                file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
                photoUrl = file.getUrl();
            } catch (err) {
                photoUrl = "Error Saving Photo: " + err.toString();
            }
        }
        // Append the row
        const nextRow = sheet.getLastRow() + 1;
        const newRow = [
            new Date(),             // Timestamp
            data.fullName,
            "'" + data.cin,           // Force string for CIN
            data.university,
            data.gender,
            data.dob,
            data.position,
            data.department,
            data.allergies,
            data.chronic,
            data.medicalDetails,
            data.email,
            "'" + data.phone,         // Force string for Phone
            "'" + data.emergency,
            data.zodiac,
            data.goals,
            data.topics,
            data.support,
            data.comm,
            data.bus,
            data.room,
            data.terms,
            data.signature ? "Signed" : "Not Signed", // Or save the base64 signature string if you prefer
            data.fee,
            photoUrl
        ];
        sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);
        return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (e) {
        return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': e.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}
