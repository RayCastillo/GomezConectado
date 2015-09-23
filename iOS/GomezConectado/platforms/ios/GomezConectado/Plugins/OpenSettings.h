//
//  OpenSettings.h
//  GomezConectado
//
//  Created by Ray Castillo B on 9/3/15.
//
//

#import <Cordova/CDV.h>

@interface OpenSettings : CDVPlugin
// This will return the file contents in a JSON object via the getFileContents utility method

- (void) cordovaopenSettings:(CDVInvokedUrlCommand *)command;
#pragma mark - Util_Methods
- (void) openSettings;


@end
