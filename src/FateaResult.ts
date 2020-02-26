import {FateaDM} from "./FateaDM";

export class FateaResult {
    public Result: string;
    public ResultId: string;
    public Source: FateaDM;

    constructor(Result: string, ResultId: string, Source: FateaDM) {
        this.Result = Result;
        this.ResultId = Result;
        this.Source = Source;
    }

    public refund() {
        return this.reportError();
    }

    public reportError() {
        return this.Source.reportError(this.ResultId);
    }
}
