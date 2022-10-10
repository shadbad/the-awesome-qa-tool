import { nanoid } from '@reduxjs/toolkit';

function generateId(): string {

    return nanoid();

}

export { generateId };
