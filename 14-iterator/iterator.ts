type TaskItem = { id: number; date: string; title: string };

class TaskList {
  private tasks: TaskItem[] = [];

  public addTask(task: TaskItem) {
    this.tasks.push(task);
  }

  public getTasks(): TaskItem[] {
    return this.tasks;
  }

  public count(): number {
    return this.tasks.length;
  }

  public getIterator(sortKey: keyof TaskItem = 'id'): TaskIterator {
    return new TaskIterator(this, sortKey);
  }
}

interface IIterator<T> {
  next(): T | undefined;
  hasNext(): boolean;
  reset(): void;
}

class TaskIterator implements IIterator<TaskItem> {
  private sortedTasks: TaskItem[];
  private currentIndex: number = 0;

  constructor(taskList: TaskList, private sortKey: keyof TaskItem) {
    this.sortedTasks = [...taskList.getTasks()].sort((a, b) => {
      if (this.sortKey === "id") {
        return a.id - b.id;
      } else if (this.sortKey === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return 0;
    });
  }

  public next(): TaskItem | undefined {
    if (this.currentIndex < this.sortedTasks.length) {
      return this.sortedTasks[this.currentIndex++];
    }
    return;
  }

  public hasNext(): boolean {
    return this.currentIndex < this.sortedTasks.length;
  }

  public reset(): void {
    this.currentIndex = 0;
  }
}

const taskList = new TaskList();
taskList.addTask({ id: 8, date: '2023-01-02', title: 'Task 2' });
taskList.addTask({ id: 1, date: '2023-01-09', title: 'Task 1' });
taskList.addTask({ id: 3, date: '2023-01-03', title: 'Task 3' });

const iteratorByDate = taskList.getIterator('date');
while (iteratorByDate.hasNext()) {
  console.log(iteratorByDate.next());
}

const iteratorById = taskList.getIterator('id');
while (iteratorById.hasNext()) {
  console.log(iteratorById.next());
}
