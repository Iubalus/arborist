# Persistence

> Jubal Rife. 9/14/25

Upon beginning this project, I was aware that I would need to store and relate a significant amount of data. I have these conceptual objects introduced by Continuous Discovery which nest and reference other objects.

My first temptation was to think of this in a tabular Database way, or as some sort of entity relationship model. (I use too much Hibernate and SQL Server in my day-to-day) This approach _technically_ would work fine, but has some challenges when it comes to flexiblity and identifiability.
* Do I have a key for each type of object?
* Do I create relationships explicitly between them by either using joining tables or a generic (leftId, rightId, relationshipTypeId)?

I temporarily side-stepped the issue by putting raw JSON in cache and leaving the persistence behavior for later. This introduced some challenges because I had not identified how identifiers should work (am I using GUIDs? Incrementing IDs? Do all records need them or can I defer the decision more?)

### What do I need?

Upon considering this problem more, I settled on the following needs:

* **Extensible**: I want to be able to add new types of objects without needing to modify global registries or shared resources. I also do not want to be forced to over-pre-define the types I plan to implement.
* **Associatable**: I want to be able to reference objects from other objects or via relational links.
* **Type Agnostic**: I don't want to need to know anything about what is in the content
* **Type Aware**: I want to know what type of content I am working with
* **Minimal API**: I don't want to have many different saves, loads, and finds. In part because I want to mock out the API during development and do not want to have to implement complex relationship logic for that to work.

### Current Target Solution

I am going to continue to ignore the detailed save behavior until I have to define that on the server level. I do want something like a resource URL, maybe a similar concept to how AWS manages resources with their ARNs.

I settled on a structure that looked like the following:

`<type>:<guid>`

Example:

`snapshot:6E6BE7A9-233B-E7DE-887C-F77535D74778`

Using this I will implement the following API methods:

```javascript
interface Response {
    error?:boolean;    
    message:string;    
    content?:any;
}

/** Given a type, generate a locator */
function createLocator(type:string): String

/** Save a resource at a particular locator */
function save(locator: string, content:any):Promise<Response>

/** Given a locator, return the expected resource */
function find(locator:string): Promise<Response>

/** Find all resources of a given type that match the criteria */
function list(type:string, filters:(v=>boolean)[]): Promise<Response>
```

#### Strengths
* It is very flexible. I can freely define new types and store them in a near-arbitrary manner. I can put whatever server-side controls I want on this mechanism to ensure data validity.

* For referential purposes, I can treat the identifier as the object. I do not need to have 2 fields to indicate id and type, they are one and the same. Meaning I can freely associate either in object or out of object.


#### Weaknesses

* I am sacrificing type safety. By making the payload type agnostic I do not know if I am storing the right content in the right locator. The onus is on the developer (and the server code) to decide if the content is approriate. Similarly, the tools will not be able to help me catch simple type errors.

* I have to know about the locator and create it myself. 

* It may be clunky to deal with the Response object every time I attempt to perform an operation. I will have to unwrap that operation.
```javascript
/*I expect a pattern like this to emerge frequently in my code. I may need to build more convenient tooling around it such as callbacks.*/
let resp = await save(locator, content);
if(resp.error){
    //do some error behavior
    return;
}
//do some success behavior
```

* Dead references: As I freely use and associate references, it may be challenging to search out all associations unless I always force such associations to take place in a shared space.

Consider the following 2 approaches

Let's assume I have 2 questions I want to associate to an outcome

##### Approach A, direct reference
```
{
    id:'outcome:123-123-123-123',
    ...outcome data
    questions:[
        'question:A123-A123-A123-A123',
        'question:B123-B123-B123-B123'
    ]
}
```

If the questions are referenced by multiple objects, a deletion of the question would require knowledge about which objects allowed associations. This would be challenging to maintain.

##### Approach B, global reference lookup
```
{
    id:'outcome:123-123-123-123',    
    ...outcome data
}

{
    references: [
        {
            left:'outcome:123-123-123-123',
            right:'question:A123-A123-A123-A123'
        },
        {
            left:'outcome:123-123-123-123',
            right:'question:B123-B123-B123-B123'
        }
    ]
}

```

Under the B approach, deletions are simple. The references must be removed from the reference table and then there will be no dead references.
There may be potential for orphaned dependencies if an object is only accessible via reference, but maintaining a secondary scan for orphanable objects would solve that without much difficulty. This type of operation should not be a problem for the expected scale (I'm considering thousands to ten-thousands of relationships as an unrealistically high upper bound for the time being.)

I will likely use the B approach for safer deletes, even though it may be frustrating to have to go to a higher reference to determine who refers to what. The flexibility and integrity I can get from that one reference space is likely worth it (at least for the current scope and scale of the project)

### Additional Concerns
* How am I going to handle type versioning? If I say something is a snapshot, but change what a snapshot means? How can I assure that things deserialize correctly?
    * I currently do not want to put the version in the locator (although that was my first thought) the reason I do not want to put the version in the locator is that I want the locator to be immutable and I do not consider versioning to be an immutable state. For instance, if I have updated snapshot from v1 to v2, when I load a v1 snapshot, I expect it to deserialize correctly, but if I save that snapshot, I expect it to be a v2 snapshot. (in some systems, they may not have this expectation. Say, for audit purposes you have to retain a legacy value even if you no longer collect it, but for the purpose and scope of this project, I am not applying such constraints or if I do, I will make a generic 'legacy content' dumping space for historic values)
    * I may put versioning inside the content itself. Does this mean I need some sort of conventional content wrap? If I use the musings above, I could consider something like
    ```javascript
    interface Content {
        version: string,//likely v1, v2
        content: any;//Some JSON object matching the version type
        deprecated?: any://Fields from older versions that may need preserved
    }
    ```
    If I maintain content versioning in the shared space, I am opening myself up to requiring explicit versioning definitions. I can take v1 as a freebie, but subsequent versions would need registered.

    Maybe something like the following.
    Unfortunatly, then explicit "current versions" and historic translations would need to be stored.

    ```javascript

    //explicit definition of current versions (if not v1)
    const versions = {
        "snapshot": "v2"
    }

    function save(locator, content){
        let type = locator.split(":")[0]        

        actualSave(locator, {
            version: versions[type]||"v1",
            content: content
        })
    }

    //explicit definitions of translations for historic conversions.
    const versionTranslators {
        snapshot:{
            "v1": (content)=> doSomething//..interpret as v2 content,            
        }
    }

    function find(locator){        
        let content = //...some find behavior
        return ((versionTranslators[locator.split(":")[0]] || {})[content.version] || (v)=>v)(content);
    }
    ```

    If I do the solution above (or some similar flavor) the most important question I have to answer is "where does the logic live?"

    I can set this up so that new versions and legacy conversions are registered with the fetch, but I still have to decide where that logic lives. Do I put them in explicit type spaces? Do I put that registration closer to the business-logic modules from where the types originate? That might make the most sense, but then it may be challenging to locate the definitions.

    Maybe I'm overthinking this. For now, I think I'll settle on a versions file with all of the historic versions together that I can import and register in the persistence. If that file becomes too unweildly, I can revisit this decision later. By then perhaps a more appropriate place will be obvious.

    ## Conclusion
    I am going to adopt the following for now:
    1. Usage of a universal locator in the form `<type>:<guid>` and a persistence object which can `createLocator, find, list, save` objects.
    2. Usage of a universal reference lookup wherin relationships can arbitrarily be defined between locators.
    ```javascript
    /** Create a locator reference */
    function link(locator:string, locators: string[]);

    /** Remove the associated locators linkages */
    function unlink(locator: string, locators: string[]);

    /** Remove all links for locator */
    function removeLinks(locator:string);
    ```
    3. Versioning strategy wherin there is a versions file to register types that are not v1 and conversion behaviors for upgraded types. This will be used by persistence to convert loaded values into the newest version.
    ```javascript
    interface Content {
        version:string;
        content:any;        
    }
    ```