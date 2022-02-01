// ==UserScript==
// @name         LongStoryShort Enhancer
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://longstoryshort.app/characters/builder/
// @icon         <$ICON$>
// @grant        none
// @require      spells.js
// ==/UserScript==

  function addStyles() {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      div#spell-info-pop-up {
        position: fixed;
        display: none;
        top: 50%;
        width: 300px;
        min-height: 300px;
        padding: 8px 12px;
        margin-left: 12px;
        background: white;
        border: 1px solid gray;
        border-radius: 8px;
        font-size: 11px;
        z-index: 1000;
        box-shadow: 1px 1px 6px 0px #000000aa;
      }
      .card-body ul.params {
        margin-left: 0;
      }
      .card-body ul.params li {
        margin-bottom: 0;
        list-style: none;
      }
      .card-body ul.params li.subsection.desc {
        margin-top: 8px;
      }
      .card-body ul.params li.subsection.desc div p {
        margin-bottom: 8px;
      }
      .card-header h2.card-title {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }
      .card-header ul {
        margin-bottom: 0;
      }
    `;
    document.body.appendChild(styleEl);
  }


  function createSpellInfoPopUp() {
    const base = document.createElement('div');
    base.id = 'spell-info-pop-up';
    return document.body.appendChild(base);
  }

  (function () {
    'use strict';

    window.onload = () => {
      console.log('Работаем');

      const spellPopUp = createSpellInfoPopUp();
      addStyles();

      document.addEventListener('mousemove', (event) => {
        if (!event.ctrlKey) {
          const posY = event.clientY - Math.max(0, 10 + (event.clientY + spellPopUp.clientHeight) - window.innerHeight);
          const posX = event.clientX - Math.max(0, 40 + (event.clientX + spellPopUp.clientWidth) - window.innerWidth);
          spellPopUp.style.top = `${posY}px`;
          spellPopUp.style.left = `${posX}px`;
        }
      });

      setTimeout(() => {
        const spellsNodes = document.querySelectorAll('.char-sheet__spells .ProseMirror');
        for (let spellNode of spellsNodes.values()) {
          for (let i = 0; i < spellNode.children.length; i++) {
            const item = spellNode.children[i];
            if (item.innerText.trim().length > 0) {
              item.addEventListener('mouseover', (event) => {
                if (!event.ctrlKey) {
                  spellPopUp.style.display = 'block';
                  spellPopUp.innerHTML = spells.find((spell) => spell.includes(event.target.innerText));
                }
              })
              item.addEventListener('mouseleave', (event) => {
                if (!event.ctrlKey) {
                  spellPopUp.style.display = 'none';
                }
              })
            }
          }
        }
      }, 1000);
    }

  })();