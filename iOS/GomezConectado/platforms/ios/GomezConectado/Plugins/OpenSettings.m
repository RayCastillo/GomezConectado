//
//  OpenSettings.m
//  GomezConectado
//
//  Created by Ray Castillo B on 9/3/15.
//
//

#import "OpenSettings.h"

@implementation OpenSettings

- (void) cordovaopenSettings:(CDVInvokedUrlCommand *)command{
    [self openSettings];
}
#pragma mark - Util_Methods

- (void)openSettings
{
    [self.commandDelegate runInBackground:^{
        // the create method goes here

    NSLog(@"[OpenSettings PLugin] Ha llegado a Nativo");
    BOOL canOpenSettings = (&UIApplicationOpenSettingsURLString != NULL);
    if (canOpenSettings) {
        NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
        [[UIApplication sharedApplication] openURL:url];
    }
    }];
}
@end
