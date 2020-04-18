Getting API with axios 
`npm i axios`
1. easier to use
2. fetch isn't supported in all browsers

useEffect :
side effect we want to call every single time some parameter change

useState : 
we are going to be storing inside of the custom hook 
which we then expose outside of this custom hook by returning 

useRef : 
a ref is essentially a value that persists after each render 
because inside of React every single thing we do is 
only store inside that render unless it's part of our state.

but if we want to store something between renders that isn't part of our state,
we need to use ref and ref is really great when you need to store references to elements for example, if you want to get a reference to our books element or input element or if you want to get a refrence to something that's related to the document API.
and in our case, we're using intersection observer which is part of the document API. 

Need to observe the last element of the page so that we can get new updates

useRef is not state so it dosen't update every single time. 
so when our reference changes, it doesnt actually rerun our component.

useCallback :
has a really unique interaction with users ref where if we set a ref
ex)
```js
const observer = useRef();
const lastBookElementRef = useCallback();

{books.map(book => {
    // whenever this element is created, it's going to call the function instead of useCallback with the reference to the element that we are using here.
    // so it's going to call the function => useCallback(node )
    return <div ref={lastBookElementRef} key={book}>{book}</div>
})}

```
All of the other callbacks that you get with hooks, we actually need to return a list of dependencies in 