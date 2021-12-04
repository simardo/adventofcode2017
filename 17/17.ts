type BufferEntry = {
    value: number;
    next: BufferEntry;
}

function doPart1(input: number): void {
    const buffer: BufferEntry = {
        value: 0
    } as BufferEntry;
    buffer.next = buffer;

    let current: BufferEntry = buffer;
    for (let iter: number = 1; iter <= 2017; iter++) {
        for (let i: number = 1; i <= input; i++) {
            current = current.next;
        }

        current.next = {
            value: iter,
            next: current.next
        }
        current = current.next;
    }

    console.log(current.next.value);
}

function doPart2(input: number): void {
    const buffer: BufferEntry = {
        value: 0
    } as BufferEntry;
    buffer.next = buffer;

    let current: BufferEntry = buffer;
    for (let iter: number = 1; iter <= 50000000; iter++) {
        for (let i: number = 1; i <= input; i++) {
            current = current.next;
        }

        if (current.value === 0) {
            console.log(iter);
        }
        current.next = {
            value: iter,
            next: current.next
        }
        current = current.next;

        // étrangement plus performant que de ne rien mettre
        if (iter % 1000000 === 0) {
            console.log(iter);
        }
    }

    console.log(buffer.next.value);
}

doPart1(3);
doPart1(0);

doPart2(0);
