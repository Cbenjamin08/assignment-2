const form = document.getElementById("cubic-form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    const root1 = document.getElementById("root-one") as HTMLInputElement;
    const root2 = document.getElementById("root-two") as HTMLInputElement
    const root3 = document.getElementById("root-three") as HTMLInputElement

    /* Different variables used for each calculation */
    const p = (3 * a * c - b * b) / (3 * a * a);
    const q = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
    const discriminant = Math.pow(q / 2, 2) + Math.pow(p / 3, 3);
    const u = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
    const v = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
    const adjustment = b / (3 * a);

    function cardano(u: number, v: number): number {
        return u + v - adjustment;
    }

    if (discriminant < 0) { // Trignometric Case for three distinc real roots
        const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));

        const rootOne = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - adjustment;
        const rootTwo = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 2 * Math.PI / 3) - adjustment;
        const rootThree = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 4 * Math.PI / 3) - adjustment;
        root1.value = rootOne.toFixed(3);
        root2.value = rootTwo.toFixed(3);
        root3.value = rootThree.toFixed(3);
    } else if (discriminant > 0) { // One real root, one pair of complex roots
        const realRoot = cardano(u, v);
        root1.value = realRoot.toFixed(3);
        root2.value = "Complex Root";
        root3.value = "Complex Root";
    } else {
        const rootRepeated = cardano(u, v);
        if (p && q === 0) { // One repeated root
            root1.value = rootRepeated.toFixed(3);
            root2.value = rootRepeated.toFixed(3);
            root3.value = rootRepeated.toFixed(3);
        } else { // One distinct root, one repeated root
            const rootSingle = Math.cbrt(q / 2) - adjustment;
            root1.value = rootRepeated.toFixed(3);
            root2.value = rootRepeated.toFixed(3);
            root3.value = rootSingle.toFixed(3);
        }
    }

    (document.getElementById("p-value") as HTMLInputElement).value = p.toFixed(3);
    (document.getElementById("q-value") as HTMLInputElement).value = q.toFixed(3);
    (document.getElementById("discriminant") as HTMLInputElement).value = discriminant.toFixed(3);

    const canvas = document.getElementById("graph") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
}
)