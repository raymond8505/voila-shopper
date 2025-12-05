# Voila Shopper Client

The client UI for the shopper. This is what the extension sideloads into voila

## Install
1. rename `.env.example` to `.env`
2. set all the values as needed (see below)
3. run `dev` or `build` script as needed
4. install the unpacked extension in the `dist` dir

## ENV Vars

### VITE_SUPABASE_API_KEY

### VITE_SUPABASE_URL

### VITE_WORKFLOW_RECOMMEND_PRODUCTS

**Payload**

`method: POST`
```json
body: {

}
```

### VITE_WORKFLOW_RECOMMEND_RECIPES
**Payload**

`method: POST`
```json
body: {
    
}
```

### VITE_RECOMMEND_PRODUCTS_BATCH_SIZE
Number of promo products to send to the recommend products workflow.

## n8n Workflows
If you just want to use my workflows, they're here. If you want to use your own, see above for each workflow's payload specs
