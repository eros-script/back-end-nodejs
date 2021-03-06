import { Router } from 'express';
import { CtrlHandler } from './utils';
import { getAll, insert, update, paging } from '../model/users';

const rtr = Router();

// get users
rtr.get('/', (req, res) => {
    CtrlHandler(req, res, async (body) => {
        const { level } = res.locals.udata;
        return await getAll(level);
    })
});

// paging
rtr.get('/paging', (req, res) => {
    CtrlHandler(req, res, async (body) => {
        const { level } = res.locals.udata;
        const { perPage, page, search } = req.query;

        return await paging(page, perPage, search, level);
    })
});

// add and update
rtr.post('/', (req, res) => {
    CtrlHandler(req, res, async (body) => {
        const { isCreate, _id: id, ...less } = body;
        const { _id, level } = res.locals.udata;
        if ((level & 0x1fff0) === 0) throw new Error('Error Privileged!');

        if (isCreate) {
            return await insert(less, _id);
        }
        return await update(less, id);
    })
});

export default rtr;