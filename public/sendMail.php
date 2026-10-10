<?php
/**
 * Contact form endpoint – receives JSON { name, email, message } and forwards it by mail.
 * RECIPIENT receives the messages; only requests from ALLOWED_ORIGIN are accepted.
 */

declare(strict_types=1);

const RECIPIENT = 'chris86noack@gmail.com';
const ALLOWED_ORIGIN = 'https://christiannoack.developerakademie.net';
const SENDER = 'noreply@christiannoack.developerakademie.net';

header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, 'Method not allowed');
}

$data = json_decode(file_get_contents('php://input') ?: '', true);
if (!is_array($data)) {
    respond(400, 'Invalid request');
}

$name = singleLine((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

if (mb_strlen($name) < 2 || mb_strlen($message) < 10 || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, 'Invalid input');
}

$subject = '=?UTF-8?B?' . base64_encode('Portfolio contact: ' . $name) . '?=';
$body = "Name: {$name}\nE-Mail: {$email}\n\n{$message}\n";
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    'From: ' . SENDER,
    'Reply-To: ' . $email,
]);

if (!mail(RECIPIENT, $subject, $body, $headers)) {
    respond(500, 'Mail could not be sent');
}

respond(200, 'OK');

/** Removes line breaks to prevent header injection. */
function singleLine(string $value): string
{
    return trim(str_replace(["\r", "\n"], ' ', $value));
}

function respond(int $status, string $text): never
{
    http_response_code($status);
    header('Content-Type: text/plain; charset=utf-8');
    echo $text;
    exit;
}
