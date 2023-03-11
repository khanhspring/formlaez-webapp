export function saveFile(response: any, fileName: string) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style.display = "none";
    a.download = fileName;

    const reader = new FileReader();
    const out = new Blob([response.data], { type: 'text/csv' });
    reader.onload = function (e: any) {
        const url = reader.result as any;
        a.href = url;
        a.click();
    };
    reader.readAsDataURL(out);
    a.parentNode?.removeChild(a);
}
