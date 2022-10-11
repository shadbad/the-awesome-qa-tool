import { useSelector, useDispatch } from 'react-redux';
import { RootStateType, appActions } from 'store';

function useAppStore() {

    const data = useSelector((state: RootStateType) => state.app);
    const dispatch = useDispatch();

    return {

        setModal(modal: 'add' | 'update' | 'delete' | 'none') {

            dispatch(appActions.setModal(modal));

        },

        data

    };

}

export { useAppStore };
