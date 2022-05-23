import React, { useEffect, useState } from "react";

interface TProps { }

//weird idea
export default class Hybrid<TProps> {
    private _component!: React.FC<TProps>;

    constructor() {
        this._component = (_props) => {

            const [awaited_str, set_awaited_str] = useState<string>("");

            async function some_slow_request(): Promise<string> {
                return new Promise((resolve, _reject) => {
                    setTimeout(() => {
                        resolve("dkfjdkjf")
                    }, 200);
                })
            }

            useEffect(() => {
                (async () => {
                    const some_resolved_promise = await some_slow_request();
                    set_awaited_str(some_resolved_promise);
                })();
            }, []);

            return (
                <div>
                    hybrid i think
                    <p>
                        {this.interop_hello()}
                    </p>
                    <p>
                        {awaited_str}
                    </p>
                </div>
            );
        }
    }

    public use_component(): React.FC<TProps> {
        return this._component;
    }


    public interop_hello(): string {
        return "hello"
    }
}