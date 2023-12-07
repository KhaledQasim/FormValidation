import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Home',
    Board: () => <div>
        <h2>Heading 2</h2></div>,
    isSnippet: true,
    environmentProps: {
        windowWidth: 332,
        windowHeight: 740
    }
});
