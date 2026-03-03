const form = document.getElementById("cubic-form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
    const discriminant = Math.pow(q/2, 2) + Math.pow(p/3, 3);
    const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
    const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
    const adjustment = b / (3 * a);

    function cardano(u: number, v: number): number {
        return u + v - adjustment;
    }

    if (discriminant < 0) {
        const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));

        const rootOne = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - adjustment;
        const rootTwo = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 2 * Math.PI / 3) - adjustment;
        const rootThree = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 4 * Math.PI / 3) - adjustment;
        (document.getElementById("result") as HTMLInputElement).value = `x1=${rootOne.toFixed(3)}, x2=${rootTwo.toFixed(3)}, x3=${rootThree.toFixed(3)}`;
    } else if (discriminant > 0) {
        const realRoot = cardano(u, v);
        (document.getElementById("result") as HTMLInputElement).value = `x=${realRoot}`;
    } else {
        const rootDouble = cardano(u, v);
        const rootSingle = Math.cbrt(q/2) - adjustment;
        (document.getElementById("result") as HTMLInputElement).value = `x1=${rootDouble}, x2=${rootSingle}`;
    }
})