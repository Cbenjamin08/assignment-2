const form = document.getElementById("cubic-form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    const discriminant = a + b + c + d;

    if (discriminant < 0) {
        (document.getElementById("result") as HTMLInputElement).value = "No Roots";
    } else if (discriminant > 0) {
        (document.getElementById("result") as HTMLInputElement).value = `x=${discriminant}`;
    } else {
        (document.getElementById("result") as HTMLInputElement).value = `x=${discriminant}`;
    }
})