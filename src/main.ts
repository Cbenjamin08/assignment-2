const form = document.getElementById("cubic-form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    const p = 3 * a * c - b * b / (3 * a * a);
    const q = 27 * a * a * d - 9 * a * b * c + 2 * b * b * b / (27 * a * a * a);
    const discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);

    if (discriminant < 0) {
        const adjustment = b / (3 * a);
        const theta = 1 / 3 * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));
        const rootOne = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - adjustment;
        const rootTwo = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 2 * Math.PI / 3) - adjustment;
        const rootThree = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 4 * Math.PI / 3) - adjustment;
        (document.getElementById("result") as HTMLInputElement).value = `x1=${rootOne}, x2=${rootTwo}, x3=${rootThree}`;
    } else if (discriminant > 0) {
        (document.getElementById("result") as HTMLInputElement).value = `x=${discriminant}`;
    } else {
        (document.getElementById("result") as HTMLInputElement).value = `x=${discriminant}`;
    }
})