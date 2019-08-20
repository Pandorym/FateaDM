import { equal } from 'assert';
import { FateaDM } from '../src/FateaDM';

describe('FateaDM', function() {

    it('default app', function() {
        let fateaDM = new FateaDM('pdId', 'pdKey');

        equal(fateaDM.appId, '315036');
        equal(fateaDM.appKey, 'SQ7SUIJlo8XgILtQRyx2vzweJhOH6UAo');
    });
});
