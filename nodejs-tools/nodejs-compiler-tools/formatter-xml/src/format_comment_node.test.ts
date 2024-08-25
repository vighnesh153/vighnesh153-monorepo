import { test, expect } from 'vitest';
import { XmlCommentNode } from '@vighnesh153/parser-xml';
import { formatCommentNode } from './format_comment_node';
import { parseProgram } from './test_utils';

test('should format comment node with 0 indentation level', () => {
  const [parser, program] = parseProgram(
    `<!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->`
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatCommentNode({
      commentNode: program.statements[0] as XmlCommentNode,
      indentation: 4,
      indentationLevel: 0,
    })
  ).toMatchInlineSnapshot(
    `"<!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->"`
  );
});

test('should format comment node with 2 indentation level', () => {
  const [parser, program] = parseProgram(
    `<!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->`
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatCommentNode({
      commentNode: program.statements[0] as XmlCommentNode,
      indentation: 4,
      indentationLevel: 2,
    })
  ).toMatchInlineSnapshot(
    `"        <!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->"`
  );
});

test('should format comment node with 2 indentation level and 3 indentation', () => {
  const [parser, program] = parseProgram(
    `<!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->`
  );

  expect(parser.errors.length).toBe(0);
  expect(program.statements.length).toBe(1);
  expect(
    formatCommentNode({
      commentNode: program.statements[0] as XmlCommentNode,
      indentation: 3,
      indentationLevel: 2,
    })
  ).toMatchInlineSnapshot(
    `"      <!-- <uses-permission android:name="com.android.providers.tv.permission.WRITE_EPG_DATA" /> -->"`
  );
});
