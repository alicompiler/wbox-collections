import { FetchActions } from './../../Data/Fetch/FetchAction';
import { DispatchFunction } from 'wbox-context/dist/Context/DispatchContext';
import { FetchService } from './FetchService';
export abstract class FetchServiceBase implements FetchService {
    private readonly dispatch: DispatchFunction;
    private shouldCancel = false;

    constructor(dispatch: DispatchFunction) {
        this.dispatch = dispatch;
    }

    async fetch(): Promise<unknown[]> {
        this.shouldCancel = false;
        this.handleStart();
        try {
            const data = await this.fetchData();
            if (!this.shouldCancel) {
                this.handleCancel();
            }
            this.handleDone(data);
            return data;
        } catch (e) {
            if (!this.shouldCancel) {
                this.handleError(e);
            } else {
                this.handleCancel();
            }
            throw e;
        }
    }

    cancel(): void {
        this.shouldCancel = true;
    }

    protected abstract fetchData(): Promise<unknown[]>;

    protected handleStart(): void {
        this.dispatch(FetchActions.start());
    }

    protected handleDone(data: unknown[]): void {
        this.dispatch(FetchActions.done(data));
    }

    protected handleError(error: unknown): void {
        this.dispatch(FetchActions.fail(error));
    }

    protected handleCancel(): void {
        // TODO : handle cancel
    }
}