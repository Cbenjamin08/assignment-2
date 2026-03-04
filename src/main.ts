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

    let rootOne: number;
    let rootTwo: number;
    let rootThree: number;

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

        rootOne = 2 * Math.sqrt(-p / 3) * Math.cos(theta) - adjustment;
        rootTwo = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 2 * Math.PI / 3) - adjustment;
        rootThree = 2 * Math.sqrt(-p / 3) * Math.cos(theta + 4 * Math.PI / 3) - adjustment;
        root1.value = rootOne.toFixed(3);
        root2.value = rootTwo.toFixed(3);
        root3.value = rootThree.toFixed(3);
    } else if (discriminant > 0) { // One real root, one pair of complex roots
        rootOne = cardano(u, v);
        root1.value = rootOne.toFixed(3);
        root2.value = "Complex Root";
        root3.value = "Complex Root";
    } else {
        rootOne = cardano(u, v);
        if (p && q === 0) { // One repeated root
            root1.value = rootOne.toFixed(3);
            root2.value = rootOne.toFixed(3);
            root3.value = rootOne.toFixed(3);
        } else { // One distinct root, one repeated root
            rootTwo = Math.cbrt(q / 2) - adjustment;
            root1.value = rootOne.toFixed(3);
            root2.value = rootOne.toFixed(3);
            root3.value = rootTwo.toFixed(3);
        }
    }

    (document.getElementById("p-value") as HTMLInputElement).value = p.toFixed(3);
    (document.getElementById("q-value") as HTMLInputElement).value = q.toFixed(3);
    (document.getElementById("discriminant") as HTMLInputElement).value = discriminant.toFixed(3);

    const canvas = document.getElementById("graph") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;
    const scale = 25;

    function drawGraph() {
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height)

        ctx.strokeStyle = "#e0e0e0";
        ctx.lineWidth = 1;

        for (let x = 0; x <= width; x += scale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = 0; y <= height; y += scale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        ctx.strokeStyle = "#000000";

        ctx.beginPath();
        ctx.moveTo(0, height / 2)
        ctx.lineTo(width, height / 2)
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(width / 2, 0)
        ctx.lineTo(width / 2, height)
        ctx.stroke();

        ctx.strokeStyle = "#ff0000"

        ctx.beginPath();
        for (let x = -width / (2 * scale); x <= width / (2 * scale); x += 0.05) {
            const y = a * x * x * x + b * x * x + c * x + d;

            const canvasX = width / 2 + x * scale;
            const canvasY = height / 2 - y * scale;

            if (x === -width / (2 * scale)) {
                ctx.moveTo(canvasX, canvasY)
            } else {
                ctx.lineTo(canvasX, canvasY);
            }

            ctx.stroke();

        }

        ctx.strokeStyle = "#002aff";
        ctx.fillStyle = "#002aff";
        ctx.beginPath();
        ctx.arc(width / 2 + rootOne * scale, height / 2, 2.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(width / 2 + rootTwo * scale, height / 2, 2.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(width / 2 + rootThree * scale, height / 2, 2.5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    drawGraph();

})