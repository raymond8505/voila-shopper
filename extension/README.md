So I can hit the ground running on new projects

# Client

1. [Vite](https://vitejs.dev/) React with Typescript
2. [Emotion](https://emotion.sh/docs/introduction) for styles
3. [Ant](https://ant.design/components/overview) for icons and components
4. [Zustand](https://github.com/pmndrs/zustand) for store

## Instructions

# App Server

Node with Web Socket connection to client. This is primarily for personal projects running at home, so server does not authenticate!

# DB Servers

## [Pocketbase](https://pocketbase.io/)

grab the executable for your OS and put it in the db dir

## [JSON Server](https://github.com/typicode/json-server)

`client\src\hooks\useJsonServer.ts` provides basic CRUD functionality for the client

See file comments for detailed usage, but I mean like, it's a basic CRUD interface.

Example

```
interface Post extends Item
{
    name: string
}
const MyPosts = () => {
    const {items,createItem,readItems,updateItem,deleteItem} = useJsonServer('posts');

    return <div>
        {(items as Post[]).map(
            item => <div key={item.id}>{item.name}</div>
            )}
        </div>
}
```
