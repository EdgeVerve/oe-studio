import '@polymer/polymer/lib/elements/dom-module.js';
const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
<template>
    <style>
        :root {
            --dark-primary-color: #0C1013;
            --primary-color: #37474F;
            --default-primary-color: #37474F;
            --light-primary-color: #455A64;
            --text-primary-color: #ffffff;
            --error-color: #FF4D63;
            --accent-color: #00ACFF;
            --primary-background-color: #37474F;
            --primary-text-color: #212121;
            --secondary-text-color: #727272;
            --disabled-text-color: #9B9B9B;
            --divider-color: #E0E0E0;
            --secondary-divider-color: rgba(255, 255, 255, 0.12);
            --default-text-color: #ffffff;
            --light-text-color: rgba(255, 255, 255, 0.65);
            --default-background-color: #fff;
            --success-text-color: #7ED321;
            --dialog-header-color: #505050;
            --highlight-color: #C1C1C1;
            --app-toolbar-font-size: 16px;
            --paper-toggle-button-checked-bar-color: #00ACFF;
            --paper-toggle-button-checked-button-color: #00ACFF;
            --paper-toggle-button-checked-ink-color: #00ACFF;
            --paper-menu-button-dropdown-background: #ffffff;
            --paper-tabs-selection-bar-color: #00ACFF;
            --paper-checkbox-checked-color: var(--default-primary-color);
            --paper-card-background-color: #ffffff;
            /* paper-menu */
            --paper-menu-background-color: #fff;
            /* paper-input */
            --paper-input-container-color: var(--secondary-text-color);
            --paper-input-container-input-color: var(--secondary-text-color);
            --paper-input-container-focus-color: var(--default-primary-color);
            --paper-dialog-background-color: var(--default-background-color);
            --paper-button: {
                padding: 8px 12px;
                box-sizing: border-box;
                height: 40px;
                font-family: Roboto-Medium;
                font-size: 14px;
                margin: 0px;
                text-transform: none;
            };
            --paper-dialog-title:{
                font-family: 'Roboto-Light';
                font-size: 18px;
                color: #000000;
                letter-spacing: 0.75px;
            };
        }
        
        body {
            @apply(--layout-fullbleed);
            @apply(--layout-vertical);
            font-family: 'Roboto';
            font-size: 16px;
            overflow-x: hidden;
            color: var(--secondary-text-color);
        }
    </style>
</template>
`;
styleElement.register('app-theme'); 