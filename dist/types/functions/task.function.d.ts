export declare function cancelTask(taskId: number): void;
export declare function task(handler: (options?: {
    didTimeout: boolean;
    timeRemaining: () => number;
}) => void): number;
