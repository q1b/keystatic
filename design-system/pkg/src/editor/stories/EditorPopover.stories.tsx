import { ActionButton } from '@keystar/ui/button';
import { Icon } from '@keystar/ui/icon';
import { boldIcon } from '@keystar/ui/icon/icons/boldIcon';
import { code2Icon } from '@keystar/ui/icon/icons/code2Icon';
import { fileCodeIcon } from '@keystar/ui/icon/icons/fileCodeIcon';
import { indentIcon } from '@keystar/ui/icon/icons/indentIcon';
import { italicIcon } from '@keystar/ui/icon/icons/italicIcon';
import { strikethroughIcon } from '@keystar/ui/icon/icons/strikethroughIcon';
import { linkIcon } from '@keystar/ui/icon/icons/linkIcon';
import { listIcon } from '@keystar/ui/icon/icons/listIcon';
import { listOrderedIcon } from '@keystar/ui/icon/icons/listOrderedIcon';
import { Box, Divider, Flex } from '@keystar/ui/layout';
import { Heading, Text } from '@keystar/ui/typography';
import { useEffect, useRef, useState } from 'react';

import { EditorPopover, EditorPopoverRef } from '..';

export default {
  title: 'Editor/Popover',
};

export const Default = () => {
  let [isOpen, setOpen] = useState(false);
  let [triggerRef, setTriggerRef] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <ActionButton onPress={() => setOpen(bool => !bool)} ref={setTriggerRef}>
        Press me
      </ActionButton>
      {isOpen && triggerRef && (
        <EditorPopover reference={triggerRef}>
          <Box padding="regular">
            <Text>Popover content</Text>
          </Box>
        </EditorPopover>
      )}
    </>
  );
};

Default.story = {
  name: 'default',
};

export const Refs = () => {
  let floating = useRef<EditorPopoverRef | null>(null);
  let [isOpen, setOpen] = useState(false);
  let [triggerRef, setTriggerRef] = useState<HTMLButtonElement | null>(null);

  return (
    <Flex gap="large">
      <ActionButton onPress={() => setOpen(bool => !bool)} ref={setTriggerRef}>
        Press me
      </ActionButton>
      {isOpen && (
        <ActionButton
          onPress={() => {
            console.log(floating.current);
          }}
        >
          Log ref data
        </ActionButton>
      )}
      {isOpen && triggerRef && (
        <EditorPopover ref={floating} reference={triggerRef}>
          <Box padding="regular">
            <Text>Popover content</Text>
          </Box>
        </EditorPopover>
      )}
    </Flex>
  );
};

Refs.story = {
  name: 'refs',
};

export const Sticky = () => {
  let [isOpen, setOpen] = useState(false);
  let [triggerRef, setTriggerRef] = useState<HTMLImageElement | null>(null);

  return (
    <Flex
      direction="column"
      maxWidth="container.xsmall"
      marginX="auto"
      gap="xlarge"
    >
      <Text>
        Sesame snaps soufflé cupcake cupcake tiramisu danish bear claw powder.
        Dessert gummi bears cookie shortbread lemon drops muffin tiramisu apple
        pie gummi bears. Cupcake tart oat cake macaroon candy apple pie biscuit
        dragée. Dessert cake sesame snaps jujubes ice cream jelly beans toffee.
        Wafer sweet pudding bonbon ice cream candy. Jelly wafer oat cake
        croissant chocolate carrot cake powder. Cookie cotton candy sweet gummi
        bears bear claw brownie. Chocolate bar jelly carrot cake cotton candy
        bonbon chupa chups dessert. Ice cream candy canes shortbread wafer
        biscuit bear claw jelly beans sugar plum. Chocolate bar dragée gummi
        bears jelly beans ice cream sweet biscuit cake fruitcake. Marzipan
        muffin pastry lollipop chocolate. Cake dessert croissant sweet roll
        topping. Chocolate bar sweet roll chocolate cake danish cheesecake
        carrot cake marshmallow. Carrot cake jelly beans sweet macaroon jujubes
        pudding.
      </Text>
      <Heading>
        Press the image below to focus it, and reveal the popover.
      </Heading>
      <img
        src="https://cupcakeipsum.com/images/happy_muffin.png"
        ref={setTriggerRef}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        tabIndex={0}
        style={{
          borderRadius: 8,
          height: 'auto',
          marginInline: 'auto',
          maxWidth: '100%',
          outline: isOpen ? '2px solid blue' : 'none',
          outlineOffset: -2,
        }}
      />
      <Text>
        Sesame snaps soufflé cupcake cupcake tiramisu danish bear claw powder.
        Dessert gummi bears cookie shortbread lemon drops muffin tiramisu apple
        pie gummi bears. Cupcake tart oat cake macaroon candy apple pie biscuit
        dragée. Dessert cake sesame snaps jujubes ice cream jelly beans toffee.
        Wafer sweet pudding bonbon ice cream candy. Jelly wafer oat cake
        croissant chocolate carrot cake powder. Cookie cotton candy sweet gummi
        bears bear claw brownie. Chocolate bar jelly carrot cake cotton candy
        bonbon chupa chups dessert. Ice cream candy canes shortbread wafer
        biscuit bear claw jelly beans sugar plum. Chocolate bar dragée gummi
        bears jelly beans ice cream sweet biscuit cake fruitcake. Marzipan
        muffin pastry lollipop chocolate. Cake dessert croissant sweet roll
        topping. Chocolate bar sweet roll chocolate cake danish cheesecake
        carrot cake marshmallow. Carrot cake jelly beans sweet macaroon jujubes
        pudding.
      </Text>
      {triggerRef && isOpen && (
        <EditorPopover adaptToViewport="stick" reference={triggerRef}>
          <Box padding="regular" maxWidth="container.xsmall">
            <Text>
              This popover will overlap the target, staying in view when the
              parent is scrolled.
            </Text>
          </Box>
        </EditorPopover>
      )}
    </Flex>
  );
};

Sticky.story = {
  name: 'sticky',
};

export const Range = () => {
  const range = useRangeFromDocumentSelection();

  return (
    <Flex
      direction="column"
      maxWidth="container.xsmall"
      marginX="auto"
      gap="xlarge"
    >
      <Text>
        Sesame snaps soufflé cupcake cupcake tiramisu danish bear claw powder.
        Dessert gummi bears cookie shortbread lemon drops muffin tiramisu apple
        pie gummi bears. Cupcake tart oat cake macaroon candy apple pie biscuit
        dragée. Dessert cake sesame snaps jujubes ice cream jelly beans toffee.
        Wafer sweet pudding bonbon ice cream candy. Jelly wafer oat cake
        croissant chocolate carrot cake powder. Cookie cotton candy sweet gummi
        bears bear claw brownie. Chocolate bar jelly carrot cake cotton candy
        bonbon chupa chups dessert. Ice cream candy canes shortbread wafer
        biscuit bear claw jelly beans sugar plum. Chocolate bar dragée gummi
        bears jelly beans ice cream sweet biscuit cake fruitcake. Marzipan
        muffin pastry lollipop chocolate. Cake dessert croissant sweet roll
        topping. Chocolate bar sweet roll chocolate cake danish cheesecake
        carrot cake marshmallow. Carrot cake jelly beans sweet macaroon jujubes
        pudding.
      </Text>
      {range && (
        <EditorPopover reference={range}>
          <Flex padding="small" gap="small">
            <ActionButton prominence="low" aria-label="bold">
              <Icon src={boldIcon} />
            </ActionButton>
            <ActionButton prominence="low" aria-label="italic">
              <Icon src={italicIcon} />
            </ActionButton>
            <ActionButton prominence="low" aria-label="Strikethrough">
              <Icon src={strikethroughIcon} />
            </ActionButton>

            <Divider orientation="vertical" />

            <ActionButton prominence="low" aria-label="Link">
              <Icon src={linkIcon} />
            </ActionButton>

            <Divider orientation="vertical" />

            <ActionButton prominence="low" aria-label="Bulleted list">
              <Icon src={listIcon} />
            </ActionButton>
            <ActionButton prominence="low" aria-label="Ordered list">
              <Icon src={listOrderedIcon} />
            </ActionButton>

            <Divider orientation="vertical" />

            <ActionButton prominence="low" aria-label="Blockquote">
              <Icon src={indentIcon} />
            </ActionButton>

            <Divider orientation="vertical" />

            <ActionButton prominence="low" aria-label="Code">
              <Icon src={code2Icon} />
            </ActionButton>
            <ActionButton prominence="low" aria-label="Code block">
              <Icon src={fileCodeIcon} />
            </ActionButton>
          </Flex>
        </EditorPopover>
      )}
    </Flex>
  );
};

Range.story = {
  name: 'range',
};

function useRangeFromDocumentSelection() {
  const [range, setRange] = useState<Range | null>(null);

  useEffect(() => {
    let listener = () => {
      let selection = window.getSelection();

      if (selection && !selection.isCollapsed) {
        setRange(selection.getRangeAt(0));
      } else {
        setRange(null);
      }
    };

    document.addEventListener('selectionchange', listener);

    return () => document.removeEventListener('selectionchange', listener);
  }, []);

  return range;
}
