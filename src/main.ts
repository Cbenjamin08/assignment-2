const form = document.getElementById("cubic-form") as HTMLFormElement;

form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const a: number = Number(formData.get("a"));
    const b: number = Number(formData.get("b"));
    const c: number = Number(formData.get("c"));
    const d: number = Number(formData.get("d"));

    const root1 = document.getElementById("root-one") as HTMLInputElement;
    const root2 = document.getElementById("root-two") as HTMLInputElement;
    const root3 = document.getElementById("root-three") as HTMLInputElement;

    let rootOne: number;
    let rootTwo: number;
    let rootThree: number;

    // Different variables used for each calculation 
    const p: number = (3 * a * c - b * b) / (3 * a * a);
    const q: number = (27 * a * a * d - 9 * a * b * c + 2 * b * b * b) / (27 * a * a * a);
    const discriminant: number = (q / 2) * (q / 2) + (p / 3) * (p / 3) * (p / 3);
    const u: number = Math.cbrt(-q / 2 + Math.sqrt(discriminant));
    const v: number = Math.cbrt(-q / 2 - Math.sqrt(discriminant));
    const adjustment: number = b / (3 * a);

    function cardano(u: number, v: number): number {
        return u + v - adjustment;
    }

    function trignometric(k: number): number {
        const theta = (1 / 3) * Math.acos(-q / (2 * Math.sqrt(-Math.pow(p / 3, 3))));
        return 2 * Math.sqrt(-p / 3) * Math.cos(theta + 2 * k * Math.PI / 3) - adjustment
    }

    if (discriminant < 0) { // Trignometric Case for three distinct real roots
        rootOne = trignometric(0);
        rootTwo = trignometric(1);
        rootThree = trignometric(2);
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
            root2.value = rootTwo.toFixed(3);
            root3.value = rootTwo.toFixed(3);
        }
    }

    function equation(): string {
        let equation: string = '';

        equation += (a > 0 ? (a === 1 ? '' : a) : (Math.abs(a) === 1 ? '-' : a)) + 'x³';
        equation += (b === 0 ? '' : (b > 0 ? ' + ' + (b === 1 ? '' : b) : ' - ' + (Math.abs(b) === 1 ? '' : Math.abs(b))) + 'x²');
        equation += (c === 0 ? '' : (c > 0 ? ' + ' + (c === 1 ? '' : c) : ' - ' + (Math.abs(c) === 1 ? '' : Math.abs(c))) + 'x');
        equation += (d === 0 ? '' : (d > 0 ? ' + ' + d : ' - ' + Math.abs(d))) + ' = 0';

        return equation;
    }

    (document.getElementById("p-value") as HTMLInputElement).value = p.toFixed(3);
    (document.getElementById("q-value") as HTMLInputElement).value = q.toFixed(3);
    (document.getElementById("discriminant") as HTMLInputElement).value = discriminant.toFixed(3);
    (document.getElementById("equation") as HTMLParagraphElement).textContent = equation();

    const canvas = document.getElementById("graph") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 25;

    function drawGraph() {
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        ctx.strokeStyle = "#e0e0e0";

        for (let x = 0; x <= width; x += scale) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        };

        for (let y = 0; y <= height; y += scale) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        };

        ctx.strokeStyle = "#000000";

        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, height);
        ctx.stroke();

        ctx.strokeStyle = "#ff0000";

        ctx.beginPath();
        for (let x = -centerX / scale; x <= centerX / scale; x += 0.05) {
            const y = a * x * x * x + b * x * x + c * x + d;
            const canvasX = centerX + x * scale; // Translates graph coordinates into pixel
            const canvasY = centerY - y * scale; // coordinates

            if (x === -centerX / scale) ctx.moveTo(canvasX, canvasY)
            else ctx.lineTo(canvasX, canvasY);
        };
        
        ctx.stroke();

        ctx.strokeStyle = "#002aff";
        ctx.fillStyle = "#002aff";
        ctx.beginPath();
        ctx.arc(centerX + rootOne * scale, centerY, 2.5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX + rootTwo * scale, centerY, 2.5, 0, 2 * Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX + rootThree * scale, centerY, 2.5, 0, 2 * Math.PI);
        ctx.fill();
    }

    drawGraph();
})