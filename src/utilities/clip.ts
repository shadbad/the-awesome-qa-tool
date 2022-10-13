function clip(input: string, wordCount: number): string {

    const array = input.split(' ');

    if (array.length <= wordCount) return input;

    return `${array.slice(0, wordCount).join(' ')} ...`;

}

export { clip };
