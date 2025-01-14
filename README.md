# YOZORA-VUE

Build beautiful, scalable UIs effortlessly with Yozora, a Vue 3 and Tailwind CSS component library focused on flexibility, responsiveness, and ease of customization. Perfect for developers seeking fast, maintainable, and utility-first design integration.

> This library still on development. Please wait until we finished it 😊

## Instalation
>Before install this package, make sure you have a installed tailwind before. 

- Install this library from NPM with this command:
    ```
    npm install yozora-vue
    ```
- Add this code into your **tailwind.config.js**
    ```
    //your code

        theme: {
            extend: {
                colors: {
                    primary: { DEFAULT: "#517C99", hover: "#81AECA" },
                    secondary: { DEFAULT: "#D469C2", hover: "#966BC5" },
                    disabled: { DEFAULT: "#C0BED7", second: "#EFEEFB" },
                    success: { DEFAULT: "#5CBC60", hover: "#85DCA8" },
                    danger: { DEFAULT: "#FD4D4D", hover: "#DC4747" },
                    gray: { DEFAULT: "#DCE1E4", second: "#B0B0B0" },
                    black: { DEFAULT: "#444444" },
                },
            },
        },

    //your code
    ```
- Installation is complete, you can use components like this.
    ```
    <script setup>
        import { Button } from 'yozora-vue'
    </script>

    <template>
        <Button>
            Test
        </Button>
    </template>
    ```

> Full documentation will be released as soon as possible.