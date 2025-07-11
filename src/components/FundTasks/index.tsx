import {FC, useState} from "react";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

const FundTasks: FC = () => {
    const [state, setState] = useState<Array<{ title: string, tasks: Array<{ name: string, description: string }> }>>([
                {
                    title: "Frontend",
                    tasks: [
                        {name: "React Setup", description: "Initialize project with Vite and TypeScript."},
                        {name: "UI Components", description: "Create reusable UI components using TailwindCSS."},
                    ],
                },
                {
                    title: "Backend",
                    tasks: [
                        {name: "Auth API", description: "Implement JWT-based authentication."},
                        {name: "Database Schema", description: "Design schema for users and sessions."},
                    ],
                },
                {
                    title: "DevOps",
                    tasks: [
                        {name: "Dockerize App", description: "Create Dockerfile and docker-compose for full stack."},
                        {name: "CI/CD", description: "Set up GitHub Actions for automated deployment."},
                    ],
                },
            ]
        )
    ;
    const [draggedTask, setDraggedTask] = useState<{
        fromSection: string;
        task: { name: string; description: string };
    } | null>(null);
    const [dragTarget, setDragTarget] = useState<{ to: string; index: number } | null>(null);


    const handleDrop = () => {
        if (!draggedTask || !dragTarget) return;


        setState(prev => {

            return prev.map(section => {

                if (section.title === draggedTask.fromSection && section.title === dragTarget.to) {

                    const newTasks = [...section.tasks];
                    const fromIndex = newTasks.findIndex(t => t.name === draggedTask.task.name);
                    const [movedTask] = newTasks.splice(fromIndex, 1);

                    const toIndex = fromIndex < dragTarget.index ? dragTarget.index - 1 : dragTarget.index;
                    newTasks.splice(toIndex, 0, movedTask);

                    return {
                        ...section,
                        tasks: newTasks,
                    };
                } else if (section.title === draggedTask.fromSection) {
                    return {
                        ...section,
                        tasks: section.tasks.filter(t => t.name !== draggedTask.task.name),
                    };
                } else if (section.title === dragTarget.to) {
                    const newTasks = [...section.tasks];
                    newTasks.splice(dragTarget.index, 0, draggedTask.task);
                    return {
                        ...section,
                        tasks: newTasks,
                    };
                }

                return section;
            });
        });
        setDraggedTask(null);
        setDragTarget(null);
    };

    return (<Box sx={{marginTop: '50px'}}>
        sfsdf
        <Box
            display="flex"
            alignItems="start"
            justifyContent="start" gap={2}
        >
            {state.map(el => {
                return <Box
                    key={el.title}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <Typography>
                        {el.title}
                    </Typography>
                    {el.tasks.map((task, index) => <Box
                        draggable
                        sx={{
                            width: 150,
                            height: 150,
                            padding: 4,
                            background: 'purple',
                            color: 'white',
                            marginTop: index > 0 ? "10px" : 0,
                            cursor: "pointer"
                        }}
                        onDrop={handleDrop}
                        onDragStart={() => setDraggedTask({fromSection: el.title, task})}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragTarget({to: el.title, index});
                        }}
                    >
                        <Typography>{task.name}</Typography>
                        <Typography component={'p'}>{task.description}</Typography>
                    </Box>)}

                    <Box
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragTarget({to: el.title, index: el.tasks.length === 0 ? 0 : el.tasks.length});
                        }}
                        onDrop={handleDrop}
                        sx={{
                            width: 150,
                            height: 150,
                            padding: 4,
                            color: 'white',
                            marginTop: "10px",
                            cursor: "pointer"
                        }}
                    />
                </Box>
            })}
        </Box>
    </Box>)
}

export default FundTasks